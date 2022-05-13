import unfluff from "unfluff";
import { models } from "@paperpod/common";
import { logger } from "@paperpod/common";
import zombie from "zombie";

/**
 * returns the publication timestamp, if any.
 * @param extracted the extracted data object fom `unfluff.lazy(html)`
 */
const date = (extracted: any) =>
  extracted.date() ? extracted.date() : undefined;

export const extractTextFromWeb = async (
  article: models.ArticleWithoutTextualData
): Promise<models.Article> => {
  const html = await getHtml(article.original_url);
  const extracted = unfluff.lazy(html);

  return {
    ...article,
    text: extracted.text(),
    title: extracted.title(),
    author: extracted.author().join(", "),
    description: extracted.description(),
    publication_time: date(extracted),
    added_time: new Date(),
  };
};

/**
 * Using Zombie (or a browser-emulator in general) makes it possible
 * to access text that is not directly provided, but client side rendered.
 */
const getHtml = (url: string): Promise<string> =>
  new Promise((resolve, _reject) => {
    const browser = new zombie({
      debug: true,
      waitFor: 15000,
    });

    browser.visit(url, function () {
      const html = browser.html();
      logger.debug({ message: `Got HTML from zombie`, html, url });
      resolve(html);
    });
  });
