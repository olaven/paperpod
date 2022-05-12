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

    /*
      NOTE: replaced puppeteer in favour of zombie because puppeteer 
      does not run on arm systems in Docker..
      [They're working on it though](https://github.com/garris/BackstopJS/issues/1300#issuecomment-1096969710)

      TODO: Consider switching back to puppeteer; Zombie is not actively maintained.

      const browser = await puppeteer.launch({
        executablePath: process.env.PUPPETEER_EXEC_PATH,
        headless: true,
        //FIXME: security considerations without sandbox? Read up on this.
        args: ["--disable-setuid-sandbox", "--no-sandbox"],
        ignoreHTTPSErrors: true,
      });
      const page = await browser.newPage();
      await page.goto(url);

      await page.waitFor("*");

      const html = await page.content();
      await browser.close();
    */
  });
