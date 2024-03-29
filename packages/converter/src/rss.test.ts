import { test, models, constants } from "@paperpod/common";
import { serialize } from "serialize-xml";
import xmlParser from "fast-xml-parser";
import faker from "faker";

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

    hasTags(["title", "link", "description", "itunes:summary", "pubDate"]);

    hasTagWithValue([
      ["title", (article) => article.title],
      [
        "link",
        (article) => `${constants.APPLICATION_URL()}/api/files/${article.id}`,
      ],
      ["description", (article) => article.description],
      ["itunes:summary", (article) => article.description],
      ["pubDate", (article) => new Date(article.added_time).toUTCString()],
    ]);

    it("adds default article description if none is present", () => {
      const serialized = serializeItem({
        ...test.mocks.article(),
        description: "",
      });
      expect(serialized).toContain(`default description`);
    });

    it("Adds proper enclosure tag", () => {
      const article = test.mocks.article();
      const serialized = serializeItem(article);

      expect(serialized).toContain(
        `<enclosure url="${constants.APPLICATION_URL()}/api/files/${
          article.id
        }" length="10" type="audio/mpeg3"`
      );
    });
  });

  describe("Converting list of articles to feed", () => {
    it("Does return something looking like RSS", () => {
      const rss = convertToRSSFeed([]);
      expect(rss).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(rss).toContain(
        '<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/">'
      );
      expect(rss).toContain("<channel>");
      expect(rss).toContain("<link>");
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

  //Escaping done with `serialize-xml`: https://github.com/olaven/serialize-xml/pull/13
  describe("Escaping of XML", () => {
    it("Escapes in title", () => {
      const firstWord = faker.lorem.word();
      const secondWord = faker.lorem.word();

      const title = `${firstWord} & ${secondWord}`;
      const rss = convertToRSSFeed([
        {
          ...test.mocks.article(),
          title,
        },
      ]);

      expect(rss).toContain(`<title>${firstWord} &amp; ${secondWord}</title>`);
    });
  });
});
