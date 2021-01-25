import { models } from "@paperpod/common";
import unfluff from "unfluff";
import puppeteer from "puppeteer";

/**
 * returns the publication timestamp, if any. 
 * @param extracted the extracted data object fom `unfluff.lazy(html)`
 */
const date = (extracted: any) =>
    extracted.date() ?
        new Date(extracted.date()).getTime() :
        undefined

export const getTextualData =
    async (url: string): Promise<{
        text: string,
        title: string,
        author: string,
        description:
        string,
        publication_timestamp: number
    }> => {


        const html = await getHtml(
            url
        ).catch(error => console.error("Puppeteer error", error));

        const extracted = unfluff.lazy(html);

        return {
            text: extracted.text(),
            title: extracted.title(),
            author: extracted.author(),
            description: extracted.description(),
            publication_timestamp: date(extracted),
        }
    }


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

    const page = await browser.newPage()
    await page.goto(url);

    await page.waitFor("*")

    const html = await page.content()
    await browser.close()

    return html;
}

