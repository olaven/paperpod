import faker from "faker";
import { models, test } from "@paperpod/common";
import { jwt } from "@paperpod/server";
import * as kall from "node-kall";
import supertest from "supertest";
import { app } from "../app";
import { articles } from "../database/database";
import { setupMigrations } from "../test-utils/test-utils";

describe("The api for articles", () => {
  setupMigrations();
  const post = (
    token: string,
    payload = test.mocks.articlePayload(),
    done: jest.DoneCallback
  ) =>
    supertest(app)
      .post("/articles")
      .set("Authorization", "Bearer " + token)
      .send(payload)
      .end(done);

  const get = (token: string, done: jest.DoneCallback) =>
    supertest(app)
      .get("/articles")
      .set("Authorization", "Bearer " + token)
      .end(done);

  const del = (token: string, _id: string, done: jest.DoneCallback) =>
    supertest(app)
      .delete(`/articles/${_id}`)
      .set("Authorization", "Bearer " + token)
      .end(done);

  describe("the POST-endpoint for articles", () => {
    jest.mock("@paperpod/converter", () => ({
      convertToText: (article: models.Article) => {
        return article;
      },
    }));

    it("Does respond with something other than NOT_IMPLEMENTED", async (done) => {
      const { status } = await supertest(app).post("/articles").end(done);
      expect(status).not.toEqual(kall.NOT_IMPLEMENTED);
    });

    it("Does respond with UNAUTHORIZED if no token is passed", async (done) => {
      const { status } = await post(null, test.mocks.articlePayload(), done);
      expect(status).toEqual(kall.UNAUTHORIZED);
    });

    it("Does respond with FORBIDDEN if user does not have an active subscription", async (done) => {
      const token = jwt.sign({
        ...test.mocks.user(),
        subscription: "inactive",
      });
      const { status } = await post(token, test.mocks.articlePayload(), done);
      expect(status).toEqual(kall.FORBIDDEN);
    });

    it("Does respond with CREATED if a valid request is made", async (done) => {
      const token = jwt.sign(test.mocks.user());
      const { status } = await post(token, test.mocks.articlePayload(), done);
      expect(status).toEqual(kall.CREATED);
    });

    it("Does return an article on valid request", async (done) => {
      const token = jwt.sign(test.mocks.user());
      const { body } = await post(token, test.mocks.articlePayload(), done);

      expect(body.id).toBeDefined();
      expect(body.original_url).toBeDefined();
      expect(body.text).toBeDefined();
      expect(body.owner_id).toBeDefined();
    });

    it("Does return the new article after creation", async (done) => {
      const token = jwt.sign(test.mocks.user());
      const before = (await (await get(token, done)).body) as models.Article[];

      const payload = test.mocks.articlePayload();
      await post(token, payload, done);

      const after = (await (await get(token, done)).body) as models.Article[];

      const inBefore = before.find(
        (article) => article.original_url === payload.link
      );
      const inAfter = after.find(
        (article) => article.original_url === payload.link
      );

      expect(inBefore).toBeFalsy();
      expect(inAfter).toBeTruthy();
    });

    it("Does not accept an article if it's not containting a valid link", async (done) => {
      const token = jwt.sign(test.mocks.user());
      post(
        token,
        {
          link: "not-a-url",
        },
        done
      ).expect(kall.BAD_REQUEST);
    });

    it("Does not respond with NOT_IMPLEMENTED if link leads to a pdf", async (done) => {
      const token = jwt.sign(test.mocks.user());
      const { status } = await post(
        token,
        {
          link: "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",
        },
        done
      );

      expect(status).not.toBe(kall.NOT_IMPLEMENTED);
    });
  });

  describe("Retrieving articles", () => {
    it("Does respond with UNAUTHORIZED if not logged in", async (done) => {
      const { status } = await get(null, done);
      expect(status).toEqual(kall.UNAUTHORIZED);
    });

    it("responds with OK if user is logged in", async (done) => {
      const token = jwt.sign(test.mocks.user());
      const { status } = await get(token, done);
      expect(status).toEqual(kall.OK);
    });

    it("Does respond with FORBIDDEN if user does not have an active subscription", async (done) => {
      const token = jwt.sign({
        ...test.mocks.user(),
        subscription: "inactive",
      });
      const { status } = await get(token, done);
      expect(status).toEqual(kall.FORBIDDEN);
    });
  });

  describe("The endpoint for deleting articles", () => {
    it("Responds with UNAUTHORIZED if not logged in", async (done) => {
      const { status } = await del(null, "some-article-id", done);
      expect(status).toEqual(kall.UNAUTHORIZED);
    });

    it("Does respond with FORBIDDEN if user does not have an active subscription", async (done) => {
      const token = jwt.sign({
        ...test.mocks.user(),
        subscription: "inactive",
      });
      const article = await articles.persist(test.mocks.article());
      const { status } = await del(token, article.id, done);
      expect(status).toEqual(kall.FORBIDDEN);
    });

    it("Responds with NOT_FOUND if the article does not exist", async (done) => {
      const token = jwt.sign(test.mocks.user());
      const { status } = await del(token, faker.datatype.uuid(), done);

      expect(status).toEqual(kall.NOT_FOUND);
    });

    it("Responds with FORBIDDEN if the user does not own the article", async (done) => {
      const article = await articles.persist(test.mocks.article());
      const token = jwt.sign(test.mocks.user());

      const { status } = await del(token, article.id, done);
      expect(status).toEqual(kall.FORBIDDEN);
    });

    it("Responds with NO_CONTENT if the user tries to delete their own article", async (done) => {
      const user: models.User = {
        ...test.mocks.user(),
        subscription: "active",
      };
      const article = await articles.persist({
        ...test.mocks.article(),
        owner_id: user.id,
      });

      const token = jwt.sign(user);

      const { status } = await del(token, article.id, done);
      expect(status).toEqual(kall.NO_CONTENT);
    });

    it("Does actually delete article on valid request", async (done) => {
      const user: models.User = {
        ...test.mocks.user(),
        subscription: "active",
      };
      const article = await articles.persist({
        ...test.mocks.article(),
        owner_id: user.id,
      });

      const token = jwt.sign(user);

      await del(token, article.id, done);

      const after = await articles.getById(article.id);
      expect(after).toEqual(null);
    });
  });
});
