import express from "express"
import faker from "faker";
import { models, test, server } from "common";
import { jwt } from "common/src/server/server";
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
            .get("/articles");

    describe("the POST-endpoint for articles", () => {

        it("Does respond with something other than NOT_IMPLEMENTED", async () => {

            const { status } = await supertest(app).post("/articles"); 
            expect(status).not.toEqual(NOT_IMPLEMENTED);
        });

        it("Does respond with UNAUTHORIZED if no token is passed", () => {

            post(null)
                .expect(UNAUTHORIZED);
        });

        it("Does respond with 201 if a valid request is made", () => {

            const token = jwt.sign(test.mocks.user()); 
            post(token)
                .expect(CREATED);
        });

        it("Does return an article on valid request",async  () => {
            
            const token = jwt.sign(test.mocks.user()); 
            const { body } = await post(token);  

            expect(body._id).toBeDefined();
            expect(body.original_url).toBeDefined();
            expect(body.google_cloud_path).toBeDefined();
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
    });

    describe("Retrieving articles", () => {

        it("Does respond with UNAUTHORIZED if not logged in", () => {

            get(null)
                .expect(UNAUTHORIZED);
        });

        it("responds with OK if user is logged in", () => {

            const token = jwt.sign(test.mocks.user())
            get(token)
                .expect(OK);
        });
    })
});