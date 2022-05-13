import supertest from "supertest";
import faker from "faker";
import { app } from "../app";
import { articles } from "../database/database";
import * as kall from "node-kall";
import { test } from "@paperpod/common";
import { setupMigrations } from "../test-utils/test-utils";

jest.mock("node-kall", () => {
  return {
    ...(jest.requireActual("node-kall") as object),
    get: async (path: string) => [200, { subscription: "active" }],
  };
});

describe("The api route for streaming files", () => {
  setupMigrations();
  const get = (article_id: string) =>
    supertest(app).get(`/files/${article_id}`);

  it("Does not respond with NOT_IMPLEMENTED", async () => {
    const { status } = await get(faker.datatype.uuid());
    expect(status).not.toEqual(kall.NOT_IMPLEMENTED);
  });

  it("Does respond with 404 if the article does not exist", async () => {
    const id = faker.datatype.uuid();

    const article = await articles.getById(id);
    const { status } = await get(id);

    expect(article).toEqual(null);
    expect(status).toEqual(kall.NOT_FOUND);
  });

  it("Responds with 200 if the article is present", async () => {
    const article = await articles.persist(test.mocks.article());
    const { status } = await get(article.id);

    expect(status).toEqual(kall.OK);
  });
});
