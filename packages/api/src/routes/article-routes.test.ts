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
  const post = (token: string, payload = test.mocks.articlePayload()) =>
    supertest(app)
      .post("/articles")
      .set("Authorization", "Bearer " + token)
      .send(payload);

  const get = (token: string) =>
    supertest(app)
      .get("/articles")
      .set("Authorization", "Bearer " + token);

  const del = (token: string, _id: string) =>
    supertest(app)
      .delete(`/articles/${_id}`)
      .set("Authorization", "Bearer " + token);

  describe("the POST-endpoint for articles", () => {
    jest.mock("@paperpod/converter", () => ({
      convertToText: (article: models.Article) => {
        return article;
      },
    }));

    it("Does respond with something other than NOT_IMPLEMENTED", async () => {
      const { status } = await supertest(app).post("/articles");
      expect(status).not.toEqual(kall.NOT_IMPLEMENTED);
    });

    it("Does respond with UNAUTHORIZED if no token is passed", async () => {
      const { status } = await post(null);
      expect(status).toEqual(kall.UNAUTHORIZED);
    });

    it("Does respond with FORBIDDEN if user does not have an active subscription", async () => {
      const token = jwt.sign({
        ...test.mocks.user(),
        subscription: "inactive",
      });
      const { status } = await post(token);
      expect(status).toEqual(kall.FORBIDDEN);
    });

    it("Does respond with CREATED if a valid request is made", async () => {
      const token = jwt.sign(test.mocks.user());
      const { status } = await post(token);
      expect(status).toEqual(kall.CREATED);
    });

    it("Does return an article on valid request", async () => {
      const token = jwt.sign(test.mocks.user());
      const { body } = await post(token);

      expect(body.id).toBeDefined();
      expect(body.original_url).toBeDefined();
      expect(body.text).toBeDefined();
      expect(body.owner_id).toBeDefined();
    });

    it("Does return the new article after creation", async () => {
      const token = jwt.sign(test.mocks.user());
      const before = (await (await get(token)).body) as models.Article[];

      const payload = test.mocks.articlePayload();
      await post(token, payload);

      const after = (await (await get(token)).body) as models.Article[];

      const inBefore = before.find(
        (article) => article.original_url === payload.link
      );
      const inAfter = after.find(
        (article) => article.original_url === payload.link
      );

      expect(inBefore).toBeFalsy();
      expect(inAfter).toBeTruthy();
    });

    it("Does not accept an article if it's not containting a valid link", async () => {
      const token = jwt.sign(test.mocks.user());
      const { status } = await post(token, {
        link: "not-a-url",
      });

      expect(status).toEqual(kall.BAD_REQUEST);
    });

    it("Does not respond with NOT_IMPLEMENTED if link leads to a pdf", async () => {
      const token = jwt.sign(test.mocks.user());
      const { status } = await post(token, {
        link: "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",
      });

      expect(status).not.toBe(kall.NOT_IMPLEMENTED);
    });
  });

  describe("Retrieving articles", () => {
    it("Does respond with UNAUTHORIZED if not logged in", async () => {
      const { status } = await get(null);
      expect(status).toEqual(kall.UNAUTHORIZED);
    });

    it("responds with OK if user is logged in", async () => {
      const token = jwt.sign(test.mocks.user());
      const { status } = await get(token);
      expect(status).toEqual(kall.OK);
    });

    it("Does respond with FORBIDDEN if user does not have an active subscription", async () => {
      const token = jwt.sign({
        ...test.mocks.user(),
        subscription: "inactive",
      });
      const { status } = await get(token);
      expect(status).toEqual(kall.FORBIDDEN);
    });
  });

  describe("The endpoint for deleting articles", () => {
    it("Responds with UNAUTHORIZED if not logged in", async () => {
      const { status } = await del(null, "some-article-id");
      expect(status).toEqual(kall.UNAUTHORIZED);
    });

    it("Does respond with FORBIDDEN if user does not have an active subscription", async () => {
      const token = jwt.sign({
        ...test.mocks.user(),
        subscription: "inactive",
      });
      const article = await articles.persist(test.mocks.article());
      const { status } = await del(token, article.id);
      expect(status).toEqual(kall.FORBIDDEN);
    });

    it("Responds with NOT_FOUND if the article does not exist", async () => {
      const token = jwt.sign(test.mocks.user());
      const { status } = await del(token, faker.datatype.uuid());

      expect(status).toEqual(kall.NOT_FOUND);
    });

    it("Responds with FORBIDDEN if the user does not own the article", async () => {
      const article = await articles.persist(test.mocks.article());
      const token = jwt.sign(test.mocks.user());

      const { status } = await del(token, article.id);
      expect(status).toEqual(kall.FORBIDDEN);
    });

    it("Responds with NO_CONTENT if the user tries to delete their own article", async () => {
      const user: models.User = {
        ...test.mocks.user(),
        subscription: "active",
      };
      const article = await articles.persist({
        ...test.mocks.article(),
        owner_id: user.id,
      });

      const token = jwt.sign(user);

      const { status } = await del(token, article.id);
      expect(status).toEqual(kall.NO_CONTENT);
    });

    it("Does actually delete article on valid request", async () => {
      const user: models.User = {
        ...test.mocks.user(),
        subscription: "active",
      };
      const article = await articles.persist({
        ...test.mocks.article(),
        owner_id: user.id,
      });

      const token = jwt.sign(user);

      await del(token, article.id);

      const after = await articles.getById(article.id);
      expect(after).toEqual(null);
    });
  });
});
