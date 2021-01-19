import { test } from "@paperpod/common";
import { hasUncaughtExceptionCaptureCallback } from "process";
import { serialize } from "serialize-xml";
import { convertToRSSFeed, toItemTag } from "./rss";


describe("Conversion from articles to RSS", () => {

    const serializeItem = (article = test.mocks.article()) =>
        serialize(
            toItemTag(article)
        )

    describe("Converting article to single item", () => {

        it("Does not throw", () => {

            const article = test.mocks.article();
            expect(() => { toItemTag(article) }).not.toThrow();
        });

        it("Does contain title", () => {

            const item = serializeItem();
            expect(item.includes("<title>")).toBeTruthy();
        });

        it("Does contain the same title as the article", () => {

            const article = test.mocks.article();
            expect(article.title).toBeDefined();
            const rss = serializeItem(article);
            console.log("HERE IS RSS", rss);
            expect(rss.includes(`<title>${article.title}</title>`)).toBeTruthy();
        });
    });

    describe("Converting list of articles to feed", () => {


        it("Does return something looking like RSS", () => {

            const rss = convertToRSSFeed([]);
            console.log(`RSS HERE ${rss}`);
            expect(rss.includes('<rss version="2.0">')).toBe(true);
            expect(rss.includes("<channel>")).toBe(true);
            expect(rss.includes("<link>")).toBe(true);
        });
    })
});