import supertest from "supertest";
import { OK, UNAUTHORIZED } from "node-kall";
import { test } from "@paperpod/common";
import { app } from "../app";

describe("The RSS file endpoint", () => {

    describe("The endpoint for getting perosnal RSS-feeds", () => {

        const getFeed = (user = test.mocks.user()) => supertest(app)
            .get(`/feeds/${user?._id}/`)

        it("Can be found", async () => {

            const { status } = await getFeed();
            expect(status).toEqual(OK);
        });

        it("Should pass", async () => {

            const { status } = await supertest(app).get("/articles");
            expect(status).not.toEqual(404);
        });

        it("Does return UNAUTHORZED if no user id is specified", async () => {

            const { status } = await getFeed(null);
            expect(status).toEqual(UNAUTHORIZED);
        });

        it("Does application/rss+xml on successful request", async () => {

            const { headers } = await getFeed();
            expect(headers.get("Content-Type")).toEqual("application/rss+xml");
        });

        it("Does return a valid XML file", async () => {

            const { text } = await getFeed();
            expect(text).toEqual("fail here to see value");
        });
    });
});