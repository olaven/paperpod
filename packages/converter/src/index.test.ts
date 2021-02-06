import { test } from "@paperpod/common"
import { withStorageUri } from ".";
import { withTextualData, getRSSFeed } from "./index";


describe("converter", () => {

    jest.mock("puppeteer");
    describe("withTextualData", () => {

        it("Does not throw", () => {

            expect(
                withTextualData(
                    test.mocks.article()
                )
            ).resolves.not.toThrow();
        });

        it("Does return replce article data", async () => {

            const original = test.mocks.article();
            const withData = await withTextualData(original);

            expect(withData.text).not.toEqual(original.text);
            expect(withData.title).not.toEqual(original.title);
            expect(withData.author).not.toEqual(original.author);
        });
    });

    describe("Getting RSS feed", () => {

        it("does not crash", () => {

            expect(() => {

                getRSSFeed([
                    test.mocks.article()
                ])
            }).not.toThrow();
        });

        //NOTE: this is properly unit tested in `rss.test.ts`
        it("Does return something looking like an XML feed", () => {


            const feed = getRSSFeed([
                test.mocks.article()
            ]);

            expect(feed).toContain("<channel>");
        });

        it("Does return a feed with data from the articles", () => {

            const articles = [
                test.mocks.article(),
                test.mocks.article(),
                test.mocks.article(),
            ];

            const feed = getRSSFeed(articles);

            articles.forEach(article => {
                expect(feed).toContain(article.title);
            });
        });
    });

    describe("withStorageUri", () => {

        jest.mock("@aws-sdk/client-polly");
        jest.mock("@aws-sdk/client-comprehend");

        it("Does not throw", async () => {

            const article = await withStorageUri(
                test.mocks.article()
            )
            expect(article).toBeDefined()
        })
    });
});