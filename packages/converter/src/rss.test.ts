import { test, models, constants } from "@paperpod/common";
import { serialize } from "serialize-xml";
import xmlParser from "fast-xml-parser";

import { convertToRSSFeed, toItemTag } from "./rss";

describe("Conversion from articles to RSS", () => {
  const serializeItem = (article = test.mocks.article()) =>
    serialize(toItemTag(article));

  const hasTags = (tags: string[]) => {
    for (const tag of tags) {
      const rss = serializeItem();
      it(`Has a tag called ${tag}`, () => {
        expect(rss).toContain(`<${tag}>`);
        expect(rss).toContain(`</${tag}>`);
      });
    }
  };

  const hasTagWithValue = (
    pairs: [string, (article: models.Article) => string][]
  ) => {
    for (const [tag, getValue] of pairs) {
      const article = test.mocks.article();
      const rss = serializeItem(article);
      const value = getValue(article);

      it(`Does have ${tag} with value of ${value}`, () => {
        expect(rss).toContain(`<${tag}>${value}</${tag}>`);
      });
    }
  };

  describe("Converting article to single RSS item", () => {
    it("Does not throw", () => {
      const article = test.mocks.article();
      expect(() => {
        toItemTag(article);
      }).not.toThrow();
    });

    hasTags([
      "title",
      "link",
      "description",
      "itunes:summary",
      "guid",
      "pubDate",
      "author",
    ]);

    hasTagWithValue([
      ["title", (article) => article.title],
      [
        "link",
        (article) => `${constants.APPLICATION_URL()}/api/files/${article.id}`,
      ],
      ["description", (article) => article.description],
      ["itunes:summary", (article) => article.description],
      ["guid", (article) => article.id],
      ["pubDate", (article) => new Date(article.added_time).toUTCString()],
      ["author", (article) => article.author],
    ]);

    it("adds default article description if none is present", () => {
      const serialized = serializeItem({
        ...test.mocks.article(),
        description: "",
      });
      expect(serialized).toContain(`default description`);
    });

    it("adds 'Unspecified Author' if no author is present", () => {
      const serialized = serializeItem({
        ...test.mocks.article(),
        author: "",
      });
      expect(serialized).toContain("Unspecified Author");
    });

    it("Adds proper enclosure tag", () => {
      const article = test.mocks.article();
      const serialized = serializeItem(article);

      expect(serialized).toContain(
        `<enclosure url="${constants.APPLICATION_URL()}/api/files/${
          article.id
        }" length="10" type="audio/mpeg"`
      );
    });
  });

  describe("Converting list of articles to feed", () => {
    it("Does return something looking like RSS", () => {
      const rss = convertToRSSFeed([]);
      expect(rss).toContain('<rss version="2.0">');
      expect(rss).toContain("<channel>");
      expect(rss).toContain("<link>");
      expect(rss).toContain("<author>Paperpod by Krets AS</author>");
    });

    describe("The channel cover image", () => {
      const getImageTag = () => {
        const rss = convertToRSSFeed([]);
        const {
          rss: {
            channel: { image },
          },
        } = xmlParser.parse(rss);
        return image;
      };

      it("Does return RSS with image", () => {
        expect(getImageTag()).toBeDefined();
      });

      it("Does return an image with url to cover", () => {
        const { url } = getImageTag();
        expect(url).toEqual(`${constants.APPLICATION_URL()}/podcast_cover.png`);
      });

      it("Does return link element corresponding to header link", () => {
        //is the URL of the site, when the channel is rendered, the image is a link to the site.
        //[ref](https://validator.w3.org/feed/docs/rss2.html#ltimagegtSubelementOfLtchannelgt)
        const { link } = getImageTag();
        expect(link).toEqual(constants.APPLICATION_URL());
      });
    });
  });
});
