import https from "https";
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

/**
 * Using Puppeteer (or a browser-emulator in general) makes it possible for 
 * me to access text that is not directly provided, but client side rendered. 
 */
const getHtml = async (url: string) => {

    console.log("besore starting")

    const browser = await puppeteer.launch({
        headless: true,
        args: ["--disable-setuid-sandbox"],
        ignoreHTTPSErrors: true,
    });

    console.log(`Started browser ${browser}`);
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'domcontentloaded' })

    const html = await page.content()
    await browser.close()

    return html;
}

/**
 * Relying on Nodes native HTTP instead 
 * of 1) modifying `kall` or 2) depending on 
 * yet another http library. 
 */
const request = (url: URL) =>
    new Promise((resolve, reject) => {

        const options = {
            hostname: url.hostname,
            path: url.pathname,
            port: 443,
            method: 'GET'
        }

        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)

            res.on('data', data => {
                resolve(data.toString())
            })
        })

        req.on('error', error => {
            reject(error);
        });

        req.end();
    });