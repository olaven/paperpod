import { test, server, models } from "@paperpod/common";
import { serialize } from "serialize-xml";
import { convertToRSSFeed, toItemTag } from "./rss";

describe("Conversion from articles to RSS", () => {

    const serializeItem = (article = test.mocks.article()) =>
        serialize(
            toItemTag(article)
        )


    const hasTags = (tags: string[]) => {

        for (const tag of tags) {

            const rss = serializeItem()
            it(`Has a tag called ${tag}`, () => {

                expect(rss).toContain(`<${tag}>`)
                expect(rss).toContain(`</${tag}>`)
            })
        }
    }

    const hasTagWithValue = (pairs: [string, (article: models.Article) => string][]) => {

        for (const [tag, getValue] of pairs) {

            const article = test.mocks.article();
            const rss = serializeItem(article);
            const value = getValue(article);

            it(`Does have ${tag} with value of ${value}`, () => {

                expect(rss).toContain(`<${tag}>${value}</${tag}>`)
            });
        }

    }

    describe("Converting article to single item", () => {

        it("Does not throw", () => {

            const article = test.mocks.article();
            expect(() => { toItemTag(article) }).not.toThrow();
        });

        hasTags([
            "title",
            "link",
            "description",
            "guid",
            "pubDate",
            "author",
        ]);

        hasTagWithValue([
            ["title", article => article.title],
            ["link", article => `https://paperpod.fm/api/files/${article._id}`],
            ["description", article => article.description],
            ["guid", article => article._id],
            ["pubDate", article => new Date(article.added_timestamp).toUTCString()],
            ["author", article => article.author],
        ]);
    });

    describe("Converting list of articles to feed", () => {


        it("Does return something looking like RSS", () => {

            const rss = convertToRSSFeed([]);
            expect(rss).toContain('<rss version="2.0">');
            expect(rss).toContain("<channel>");
            expect(rss).toContain("<link>");
        });
    });

});