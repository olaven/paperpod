import supertest from "supertest";
import { OK, UNAUTHORIZED } from "node-kall";
import { models, test } from "@paperpod/common";
import * as database from "../database/database";
import { app } from "../app";

describe("The RSS file endpoint", () => {

    const persistArticle = (article: Partial<models.Article> = {}) =>
        database.articles.persist(
            test.mocks.article(article)
        );

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
            expect(headers["content-type"]).toEqual("application/rss+xml; charset=utf-8");
        });

        it("Does convert an rss field containint the data from all articles", async () => {

            const user = test.mocks.user();

            const articles = [
                await persistArticle({ owner_id: user._id }),
                await persistArticle({ owner_id: user._id }),
                await persistArticle({ owner_id: user._id }),
                await persistArticle({ owner_id: user._id }),
            ]

            const rss = (await getFeed(user)).text;
            for (const article of articles) {

                expect(rss).toContain(`<title>${article.title}</title>`);
                expect(rss).toContain(`<description>${article.description}</description>`);
            }
        })
    });
});