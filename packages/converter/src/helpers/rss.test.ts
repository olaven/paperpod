import { test } from "@paperpod/common";
import { convertToRSS } from "../converter";
import { articleToRSSItem } from "./rss";


describe("Conversion from articles to RSS", () => {

    describe("Converting a single article", () => {

        it("Does not throw", () => {

            const article = test.mocks.article();
            expect(() => { articleToRSSItem(article) }).not.toThrow();
        });
    })
});