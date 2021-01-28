import { models, test } from "@paperpod/common";
import { jwt } from "@paperpod/server";
import { OK, BAD_REQUEST, CREATED, UNAUTHORIZED, CONFLICT, NOT_IMPLEMENTED } from "node-kall";
import supertest from "supertest";
import { app } from "../app";

//FIXME: Tests pass regardless of what status code I am checking.. This renders the tests useless.

describe("The api for articles", () => {

    const post = (token: string, payload = test.mocks.articlePayload()) =>
        supertest(app)
            .post("/articles")
            .set("Authorization", "Bearer " + token)
            .send(payload);

    const get = (token: string) =>
        supertest(app)
            .get("/articles")
            .set("Authorization", "Bearer " + token);

    describe("the POST-endpoint for articles", () => {

        jest.mock("@paperpod/converter", () => ({
            convertToText: (article: models.Article) => {

                console.log("INSIDE AUDIO TEXT MOCK");
                return article;
            },
        }));

        it("Does respond with something other than NOT_IMPLEMENTED", async () => {

            const { status } = await supertest(app).post("/articles");
            expect(status).not.toEqual(NOT_IMPLEMENTED);
        });

        it("Does respond with UNAUTHORIZED if no token is passed", async () => {

            const { status } = await post(null)
            expect(status).toEqual(UNAUTHORIZED);
        });

        it("Does respond with 201 if a valid request is made", async () => {

            const token = jwt.sign(test.mocks.user());
            const { status } = await post(token);
            expect(status).toEqual(CREATED);
        });

        it("Does return an article on valid request", async () => {

            const token = jwt.sign(test.mocks.user());
            const { body } = await post(token);

            expect(body._id).toBeDefined();
            expect(body.original_url).toBeDefined();
            expect(body.text).toBeDefined();
            expect(body.owner_id).toBeDefined();
        });

        it("Does return the new article after creation", async () => {

            const token = jwt.sign(test.mocks.user());
            const before = await (await get(token)).body as models.Article[];

            const payload = test.mocks.articlePayload();
            await post(token, payload);

            const after = await (await get(token)).body as models.Article[];

            const inBefore = before.find(article => article.original_url === payload.link);
            const inAfter = after.find(article => article.original_url === payload.link);

            expect(inBefore).toBeFalsy();
            expect(inAfter).toBeTruthy();
        });

        it("Does not accept an article if it's not containting a valid link", async () => {

            const token = jwt.sign(test.mocks.user());
            post(token, {
                link: "not-a-url"
            }).expect(BAD_REQUEST);
        });
    });

    describe("Retrieving articles", () => {

        it("Does respond with UNAUTHORIZED if not logged in", async () => {

            const { status } = await get(null)
            expect(status).toEqual(UNAUTHORIZED);
        });

        it("responds with OK if user is logged in", async () => {

            const token = jwt.sign(test.mocks.user())
            const { status } = await get(token)
            expect(status).toEqual(OK);
        });
    })
});