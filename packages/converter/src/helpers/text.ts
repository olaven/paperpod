import unfluff from "unfluff";
import puppeteer from "puppeteer";

export const getTextualData =
    async (url: string): Promise<{ title: string, text: string }> => {


        const html = await getHtml(
            url
        ).catch(error => console.error("Puppeteer error", error));
        console.log("Got page contenet with puppeteer: ", html);
        console.log("HTML FOUND", html);
        const extracted = unfluff.lazy(html);
        console.log("text found: ", extracted.text());

        return {
            title: extracted.title(),
            text: extracted.text(),
        }
    }



const waitTillHTMLRendered = async (page: puppeteer.Page, timeout = 30000) => {
    const checkDurationMsecs = 1000;
    const maxChecks = timeout / checkDurationMsecs;
    let lastHTMLSize = 0;
    let checkCounts = 1;
    let countStableSizeIterations = 0;
    const minStableSizeIterations = 3;

    while (checkCounts++ <= maxChecks) {
        let html = await page.content();
        let currentHTMLSize = html.length;

        let bodyHTMLSize = await page.evaluate(() => document.body.innerHTML.length);

        console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, " body html size: ", bodyHTMLSize);

        if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
            countStableSizeIterations++;
        else
            countStableSizeIterations = 0; //reset the counter

        if (countStableSizeIterations >= minStableSizeIterations) {
            console.log("Page rendered fully..");
            break;
        }

        lastHTMLSize = currentHTMLSize;
        await page.waitFor(checkDurationMsecs);
    }
};
/**
 * Using Puppeteer (or a browser-emulator in general) makes it possible for 
 * me to access text that is not directly provided, but client side rendered. 
 */
const getHtml = async (url: string) => {

    console.log("before starting")
    const browser = await puppeteer.launch({
        executablePath: process.env.PUPPETEER_EXEC_PATH,
        headless: true,
        args: ["--disable-setuid-sandbox", "--no-sandbox"],
        ignoreHTTPSErrors: true,
    });

    console.log(`Started browser ${browser}`);
    const page = await browser.newPage()
    await page.goto(url, { 'waitUntil': "networkidle2" });
    //await waitTillHTMLRendered(page);

    //await page.waitFor("*")

    const html = await page.content()
    await browser.close()

    return html;
}

