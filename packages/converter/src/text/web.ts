import unfluff from "unfluff";
import puppeteer from "puppeteer";
import { models } from "@paperpod/common";

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
    added_time: new Date()
  };
};

/**
 * Using Puppeteer (or a browser-emulator in general) makes it possible for
 * me to access text that is not directly provided, but client side rendered.
 */
const getHtml = async (url: string) => {
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

  return html;
};
