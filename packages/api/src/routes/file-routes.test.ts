import supertest from "supertest";
import faker from "faker";
import { app } from "../app";
import { articles } from "../database/database";
import { OK, NOT_FOUND, NOT_IMPLEMENTED } from "node-kall";
import { test } from "@paperpod/common";

describe("The api route for streaming files", () => {

    const get = (article_id: string) =>
        supertest(app)
            .get(`/files/${article_id}`)

    it("Does not respond with NOT_IMPLEMNTED", async () => {

        const { status } = await get(faker.random.uuid());
        expect(status).not.toEqual(NOT_IMPLEMENTED);
    });

    it("Does respond with 404 if the article does not exist", async () => {

        const id = faker.random.uuid();

        const article = await articles.getById(id);
        const { status } = await get(id);

        expect(article).toEqual(null);
        expect(status).toEqual(NOT_FOUND);
    });

    it("Responds with 200 if the article is present", async () => {

        const article = await articles.persist(test.mocks.article());
        const { status } = await get(article._id);

        expect(status).toEqual(OK);
    })
});