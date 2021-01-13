import faker from "faker";
import { models, server, test } from "common";
import { jwt } from "common/src/server/server";
import { OK, BAD_REQUEST, CREATED, UNAUTHORIZED, CONFLICT } from "node-kall";
import supertest from "supertest";
import { app } from "../app";
import { hash } from "../cryptography/cryptography";

//FIXME: Tests pass regardless of what status code I am checking.. This renders the tests useless.

describe("The authentication endpoint for users", () => {

    const signUp = (credentials = test.mocks.credentials(), agent = supertest.agent(app)) =>
        agent
            .post("/users")
            .send(credentials as any);

    const extractBearerToken = async (test: supertest.Test) =>
        (await test).body.token


    describe("POST request for creating new users", () => {

        it("Does respond with BAD_REQUEST if no user is sent", async () => {

            await signUp(null)
                .expect(BAD_REQUEST);
        });

        it("Does respond with BAD_REQUEST if password is undefined", async () => {

            await signUp({
                ...test.mocks.credentials(),
                password: undefined,
            })
                .expect(BAD_REQUEST);
        });

        it("Does respond with BAD_REQUEST if email is undefined", async () => {

            await signUp({
                ...test.mocks.credentials(),
                email: undefined,
            })
                .expect(BAD_REQUEST);
        });

        it("Does respond with BAD_REQUEST if email and password are both undefined", async () => {

            await signUp({
                email: undefined,
                password: undefined,
            })
                .expect(BAD_REQUEST);
        });

        it("Redirects to front page if successful", async () => {

            const credentials = test.mocks.credentials();
            await signUp(credentials)
                .expect(CREATED)
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
            const before = await server.getUserByEmail(credentials.email);
            expect(before).toBeNull();

            await signUp(credentials)
                .expect(CREATED);

            const after = await server.getUserByEmail(credentials.email);
            expect(after).toBeDefined();
        });

        it("Does create a user with correct email", async () => {

            const credentials = test.mocks.credentials();
            await signUp(credentials)
                .expect(CREATED);

            const user = await server.getUserByEmail(credentials.email);
            expect(user.email).toEqual(credentials.email);
        });

        it("Does create a user with and id", async () => {

            const credentials = test.mocks.credentials();
            await signUp(credentials)
                .expect(CREATED);

            const user = await server.getUserByEmail(credentials.email);
            expect(user._id).toBeDefined();
            expect(user._id).not.toEqual(credentials.email);
            expect(user._id).not.toEqual(credentials.password);
        });

        it("Does create a user, but does not store the password", async () => {

            const credentials = test.mocks.credentials();
            await signUp(credentials)
                .expect(CREATED);

            const user = await server.getUserByEmail(credentials.email);
            expect(user.password_hash).not.toEqual(credentials.password);
        });

        it("Does create a user and stores hash comparable with bcrypt", async () => {

            const credentials = test.mocks.credentials();
            await signUp(credentials)
                .expect(CREATED);

            const user = await server.getUserByEmail(credentials.email);
            expect(
                await hash.compare(credentials.password, user.password_hash)
            ).toBe(true);
        });
    });

    describe("GET endpoint for retrieving information about the logged in user", () => {

        const getMe = (token: string, agent = supertest(app)) =>
            agent
                .get("/users/me")
                .set("Authorization", "Bearer " + token)

        it("Responds with UNAUTHORIZED if the user is not logged in", async () => {

            getMe(null)
                .expect(UNAUTHORIZED);
        });

        it("Resopnds with UNAUTHORIZED if the JWT token is present, but not valid", async () => {

            getMe(faker.random.uuid());
        });

        it("Responds with OK if the user is logged in", async () => {

            getMe(
                await extractBearerToken(
                    signUp()
                )
            ).expect(OK);
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


            const { body } = await getMe(
                await extractBearerToken(
                    signUp(credentials)
                )
            ).expect(OK);

            expect(body.email).toEqual(credentials.email);
        });

        it("Responds with UNAUTHORIZED if there's no token", () => {

            getMe(null).expect(UNAUTHORIZED)
        });

        it("Responds with BAD_REQUEST if there is a token, but it's not properly formatted", () => {

            getMe("badly formatted token").expect(BAD_REQUEST);
        });

        it("something fishy is going on", () => {

            getMe(null).expect(CONFLICT)
        })

        it("Responds with OK if user is logged in", async () => {

            const agent = supertest.agent(app);
            agent
                .post("/users")
                .send(test.mocks.credentials());

            agent
                .get("/users/me")
                .expect(OK);
        });
    });
});