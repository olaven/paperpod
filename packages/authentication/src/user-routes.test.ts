import { BAD_REQUEST, UNAUTHORIZED } from "node-kall";
import supertest from "supertest";
import { authentication } from "./index";

describe("The authentication endpoint for users", () => {

    describe("POST request for creating new users", () => {

        it("Does respond with BAD_REQUEST if no user is sent", () =>
            supertest(authentication)
                .post("/users")
                .send(null)
                .expect(BAD_REQUEST)
        );
    });

    describe("GET endpoint for retrieving information about the logged in user", () => {

        it("Responds with UNAUTHORIZED if the user is not logged in", () =>
            supertest(authentication)
                .get("/users/me")
                .expect(UNAUTHORIZED)
        );
    });
});