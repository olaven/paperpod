import express from "express"
import faker from "faker";
import { models, test } from "common";
import { jwt } from "common/src/server/server";
import * as database from "../authdatabase/authdatabase";
import { OK, BAD_REQUEST, CREATED, UNAUTHORIZED, CONFLICT, FORBIDDEN } from "node-kall";
import supertest from "supertest";
import { app } from "../app";
import { hash } from "../cryptography/cryptography";

//FIXME: Tests pass regardless of what status code I am checking.. This renders the tests useless.

describe("The authentication endpoint for users", () => {

    const signUp = (credentials = test.mocks.credentials(), agent = supertest.agent(app)) =>
        agent
            .post("/users")
            .send(credentials as any);

    const extractBearerToken = async (test: supertest.Test) => {

        const { body: { token } } = await test;
        return token;
    }



    describe("Local test utils", () => {

        describe("extractBearerToken", () => {

            it("Does extract something defined", async () => {

                const token = await extractBearerToken(
                    signUp()
                );

                expect(token).toBeDefined();
            });

            it("Does returns the correct token", async () => {


                const sentToken = faker.random.uuid();
                const app = express().get("/", (request, response) => {
                    response.json({
                        token: sentToken
                    });
                });

                const retrievedToken = await extractBearerToken(
                    supertest(app).get("/")
                );

                expect(sentToken).toEqual(retrievedToken);
            })
        });
    });

    describe("POST request for creating new users", () => {

        it("Does respond with BAD_REQUEST if no user is sent", async () => {

            const { status } = await signUp(null)
            expect(status).toEqual(BAD_REQUEST);
        });

        it("Does respond with BAD_REQUEST if password is undefined", async () => {

            const { status } = await signUp({
                ...test.mocks.credentials(),
                password: undefined,
            });
            expect(status).toEqual(BAD_REQUEST);
        });

        it("Does respond with BAD_REQUEST if email is undefined", async () => {

            const { status } = await signUp({
                ...test.mocks.credentials(),
                email: undefined,
            });

            expect(status).toEqual(BAD_REQUEST);
        });

        it("Does respond with BAD_REQUEST if email and password are both undefined", async () => {

            const { status } = await signUp({
                email: undefined,
                password: undefined,
            }); 

            expect(status).toEqual(BAD_REQUEST);
        });

        it("Redirects to front page if successful", async () => {

            const credentials = test.mocks.credentials();
            const { status } = await signUp(credentials)
            expect(status).toEqual(CREATED);
        });

        it("Returns a token containint the correct user on signup", async () => {

            const credentials = test.mocks.credentials();
            const response = await signUp(credentials);

            const token = response.body.token;

            //NOTE: assumes test JWT_SECRET secret is present and same when creating and reading here
            const parsed = jwt.decode<models.User>(token);
            expect(parsed.email).toEqual(credentials.email);
        })

        it("Results in a user being created if successful", async () => {

            const credentials = test.mocks.credentials();
            const before = await database.users.getByEmail(credentials.email);
            expect(before).toBeNull();

            const { status } = await signUp(credentials)
            expect(status).toEqual(CREATED);

            const after = await database.users.getByEmail(credentials.email);
            expect(after).toBeDefined();
        });

        it("Does create a user with correct email", async () => {

            const credentials = test.mocks.credentials();
            const { status } = await signUp(credentials)
            expect(status).toEqual(CREATED);

            const user = await database.users.getByEmail(credentials.email);
            expect(user.email).toEqual(credentials.email);
        });

        it("Does create a user with and id", async () => {

            const credentials = test.mocks.credentials();
            const { status } = await signUp(credentials)
            expect(status).toEqual(CREATED);

            const user = await database.users.getByEmail(credentials.email);
            expect(user._id).toBeDefined();
            expect(user._id).not.toEqual(credentials.email);
            expect(user._id).not.toEqual(credentials.password);
        });

        it("Does create a user, but does not store the password", async () => {

            const credentials = test.mocks.credentials();
            const { status } = await signUp(credentials)
            expect(status).toEqual(CREATED);

            const user = await database.users.getByEmail(credentials.email);
            expect(user.password_hash).not.toEqual(credentials.password);
        });

        it("Does create a user and stores hash comparable with bcrypt", async () => {

            const credentials = test.mocks.credentials();
            const { status } = await signUp(credentials)
            expect(status).toEqual(CREATED);

            const user = await database.users.getByEmail(credentials.email);
            expect(
                await hash.compare(credentials.password, user.password_hash)
            ).toBe(true);
        });

        it("Responds with CONFLICT if attempting to create the same user twice", async () => {

            const credentials = test.mocks.credentials();
            const firstResponse = await signUp(credentials)
            expect(firstResponse.status).toEqual(CREATED);

            const secondResponse = await signUp(credentials)
            expect(secondResponse.status).toEqual(CONFLICT);
        });
    });

    describe("GET endpoint for retrieving information about the logged in user", () => {

        const getMe = (token: string, agent = supertest(app)) =>
            agent
                .get("/users/me")
                .set("Authorization", "Bearer " + token)

        it("Responds with UNAUTHORIZED if the user is not logged in", async () => {

            const { status } = await getMe(null)
            expect(status).toEqual(UNAUTHORIZED);
        });

        it("Resopnds with FORBIDDEN if the JWT token is present, but not valid", async () => {

            //a token from jwt.io, not encrypted with the same secret 
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
            const { status } = await getMe(token);
            expect(status).toEqual(FORBIDDEN);
        });

        it("Responds with OK if the user is logged in", async () => {

            const { status } = await getMe(
                await extractBearerToken(
                    signUp()
                )
            ); 
            
            expect(status).toEqual(OK)
        });

        it("Returns the user object if the user is logged in", async () => {

            const token = await extractBearerToken(
                signUp()
            )
            const { body } = await getMe(token).expect(OK)

            expect(body.email).toBeDefined();
            expect(body._id).toBeDefined();
        });

        it("Does not return the password hash to client", async () => {

            expect(

                (await getMe(
                    await extractBearerToken(
                        signUp()
                    )
                )).body.password_hash
            ).toBeUndefined();

        });

        it("Does return user data for the correct user", async () => {

            const credentials = test.mocks.credentials();


            const { body, status } = await getMe(
                await extractBearerToken(
                    signUp(credentials)
                )
            )

            expect(status).toEqual(OK);
            expect(body.email).toEqual(credentials.email);
        });

        it("Responds with FORBIDDEN if there is a token, but it's not properly formatted", async () => {

            const { status } = await getMe("badly formatted token")
            expect(status).toEqual(FORBIDDEN)
        });

        it("Responds with OK if user is logged in", async () => {

            const token =await  extractBearerToken(
                signUp()
            )

            const { status } = await getMe(token)            
            expect(status).toEqual(OK);
        });
    });
});