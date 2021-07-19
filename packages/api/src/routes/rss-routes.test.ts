import supertest from "supertest";
import * as kall from "node-kall";
import { models, test } from "@paperpod/common";
import * as database from "../database/database";
import { app } from "../app";
import { mockSubscriptionStatusCall } from "./route-test-utils";

jest.mock("node-kall", () => {
  console.log("INSIDE KALL MOCK");
  return {
    ...(jest.requireActual("node-kall") as object),
    get: async (path: string) => [200, { subscription: "active" }],
  };
});

describe("The RSS file endpoint", () => {
  const persistArticle = (article: Partial<models.Article> = {}) =>
    database.articles.persist(test.mocks.article(article));

  describe("The endpoint for getting personal RSS-feeds", () => {
    const getFeed = (user = test.mocks.user()) =>
      supertest(app).get(`/feeds/${user?.id}/`);

    it("Can be reached", async () => {
      const { status } = await getFeed();
      expect(status).toEqual(kall.OK);
    });

    it("Does return UNAUTHORIZED if no user id is specified", async () => {
      const { status } = await getFeed(null);
      expect(status).toEqual(kall.UNAUTHORIZED);
    });

    it("Does application/rss+xml on successful request", async () => {
      const { headers } = await getFeed();
      expect(headers["content-type"]).toEqual(
        "application/rss+xml; charset=utf-8"
      );
    });

    it("Does convert an rss field containing the data from all articles", async () => {
      const user = test.mocks.user();

      const articles = [
        await persistArticle({ owner_id: user.id }),
        await persistArticle({ owner_id: user.id }),
        await persistArticle({ owner_id: user.id }),
        await persistArticle({ owner_id: user.id }),
      ];

      const rss = (await getFeed(user)).text;
      for (const article of articles) {
        expect(rss).toContain(`<title>${article.title}</title>`);
        expect(rss).toContain(
          `<description>${article.description}</description>`
        );
      }
    });
  });
});
