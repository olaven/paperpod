import { models, test } from "common";
import { mocks } from "common/src/test/test";
import faker from "faker";
import { BAD_REQUEST, CREATED, FOUND, UNAUTHORIZED } from "node-kall";
import supertest from "supertest";
import { app } from "./app";

describe("The authentication endpoint for users", () => {

    describe("POST request for creating new users", () => {

        const postUser = (credentials = test.mocks.credentials()) =>
            supertest(app)
                .post("/users")
                .send(credentials as any);

        it("Does respond with BAD_REQUEST if no user is sent", async () => {

            await postUser(null)
                .expect(BAD_REQUEST);
        });

        it("Does respond with BAD_REQUEST if password is undefined", async () => {

            await postUser({
                ...test.mocks.credentials(),
                password: undefined,
            }).expect(BAD_REQUEST);
        });

        it("Does respond with BAD_REQUEST if email is undefined", async () => {

            await postUser({
                ...test.mocks.credentials(),
                email: undefined,
            }).expect(BAD_REQUEST);
        });

        it("Does respond with BAD_REQUEST if email and password are both undefined", async () => {

            await postUser({
                email: undefined,
                password: undefined,
            }).expect(BAD_REQUEST);
        });

        it("Redirects to front page if successful", async () => {

            const credentials = test.mocks.credentials();
            await postUser(credentials)
                .expect(FOUND)
                .expect("location", "/");
        });
    });

    describe("GET endpoint for retrieving information about the logged in user", () => {

        it("Responds with UNAUTHORIZED if the user is not logged in", async () => {

            supertest(app)
                .get("/users/me/")
                .expect(UNAUTHORIZED)
        });
    });
});