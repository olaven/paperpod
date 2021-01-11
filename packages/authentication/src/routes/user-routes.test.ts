import { models, server, test } from "common";
import { mocks } from "common/src/test/test";
import faker from "faker";
import { OK, BAD_REQUEST, CREATED, FOUND, UNAUTHORIZED } from "node-kall";
import supertest from "supertest";
import { app } from "./app";
import { compare } from "./hash/hash";

describe("The authentication endpoint for users", () => {

    const signUp = (credentials = test.mocks.credentials(), agent = supertest.agent(app)) => {

        const response = agent
            .post("/users")
            .send(credentials as any);

        return { response, agent }
    }

    describe("POST request for creating new users", () => {

        it("Does respond with BAD_REQUEST if no user is sent", async () => {

            await signUp(null)
                .response
                .expect(BAD_REQUEST);
        });

        it("Does respond with BAD_REQUEST if password is undefined", async () => {

            await signUp({
                ...test.mocks.credentials(),
                password: undefined,
            }).response
                .expect(BAD_REQUEST);
        });

        it("Does respond with BAD_REQUEST if email is undefined", async () => {

            await signUp({
                ...test.mocks.credentials(),
                email: undefined,
            }).response
                .expect(BAD_REQUEST);
        });

        it("Does respond with BAD_REQUEST if email and password are both undefined", async () => {

            await signUp({
                email: undefined,
                password: undefined,
            }).response
                .expect(BAD_REQUEST);
        });

        it("Redirects to front page if successful", async () => {

            const credentials = test.mocks.credentials();
            await signUp(credentials)
                .response
                .expect(FOUND)
                .expect("location", "/");
        });

        it("Results in a user being created if successful", async () => {

            const credentials = test.mocks.credentials();
            const before = await server.getUserByEmail(credentials.email);
            expect(before).toBeNull();


            await signUp(credentials).response
                .expect(FOUND);

            const after = await server.getUserByEmail(credentials.email);
            expect(after).toBeDefined();
        });

        it("Does create a user with correct email", async () => {

            const credentials = test.mocks.credentials();
            await signUp(credentials).response
                .expect(FOUND);

            const user = await server.getUserByEmail(credentials.email);
            expect(user.email).toEqual(credentials.email);
        });

        it("Does create a user with and id", async () => {

            const credentials = test.mocks.credentials();
            await signUp(credentials).response
                .expect(FOUND);

            const user = await server.getUserByEmail(credentials.email);
            expect(user._id).toBeDefined();
            expect(user._id).not.toEqual(credentials.email);
            expect(user._id).not.toEqual(credentials.password);
        });

        it("Does create a user, but does not store the password", async () => {

            const credentials = test.mocks.credentials();
            await signUp(credentials).response
                .expect(FOUND);

            const user = await server.getUserByEmail(credentials.email);
            expect(user.password_hash).not.toEqual(credentials.password);
        });

        it("Does create a user and stores hash comparable with bcrypt", async () => {

            const credentials = test.mocks.credentials();
            await signUp(credentials).response
                .expect(FOUND);

            const user = await server.getUserByEmail(credentials.email);
            expect(
                await compare(credentials.password, user.password_hash)
            ).toBe(true);
        });
    });

    describe("GET endpoint for retrieving information about the logged in user", () => {

        const getMe = (agent = supertest.agent(app)) =>
            agent
                .get("/users/me");
        it("Responds with UNAUTHORIZED if the user is not logged in", async () => {

            getMe()
                .expect(UNAUTHORIZED);
        });

        it("Responds with OK if the user is logged in", async () => {

            getMe(
                signUp().agent
            ).expect(OK);
        });

        it("Returns user data if the user was signed in", async () => {

            const { agent } = signUp();
            const { body } = await getMe(agent)

            expect(body.email).toBeDefined();
            expect(body._id).toBeDefined();
        });

        it("Does not return the password hash to client", async () => {

            expect(

                (await getMe(
                    signUp().agent
                )).body.password_hash
            ).toBeUndefined();

        });

        it("Does return user data for the correct user", async () => {

            const credentials = test.mocks.credentials();
            const { agent } = signUp(credentials);

            const { body } = await getMe(agent);
            expect(body.email).toEqual(credentials.email);
        });

        it("Responds with OK if user is logged in", () => {

            const agent = supertest.agent(app);
            agent
                .post("/users")
                .send(test.mocks.credentials());

            agent
                .get("/users/me")
                .expect(OK);
        });

        it("Does return user data", async () => {

            const agent = supertest.agent(app);
            agent
                .post("/users")
                .send(test.mocks.credentials());

            const response = await agent
                .get("/users/me")
                .expect(OK);

            expect(response.body.email).toBeDefined();
            expect(response.body._id).toBeDefined();
        });

        it("TIMEOUT when awaiting", async () => {

            await supertest(app)
                .get("/users/me")
        });

        it("TIMEOUT when using .then", (done) => {

            supertest(app)
                .get("/users/me")
                .then(response => {

                    done();
                });
        });

        it("WORKING when not using promises at all", () => {

            supertest(app)
                .get("/users/me");
        });
    });
});