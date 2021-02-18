import { test, models, constants } from "@paperpod/common";
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
            "enclosure"
        ]);

        hasTagWithValue([
            ["title", article => article.title],
            ["link", article => `${constants.APPLICATION_URL}/api/files/${article._id}`],
            ["description", article => article.description],
            ["guid", article => article._id],
            ["pubDate", article => new Date(article.added_timestamp).toUTCString()],
            ["author", article => article.author],
            ["author", article => "Paperpod by Krets AS"],
        ]);

        it("adds default article description if none is present", () => {

            const serialized = serializeItem({
                ...test.mocks.article(),
                description: ''
            });
            expect(serialized).toContain(`default description`);
        });

        it("adds 'Unspecified Author' if no author is present", () => {

            const serialized = serializeItem({
                ...test.mocks.article(),
                author: ''
            });
            expect(serialized).toContain("Unspecified Author");
        })
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