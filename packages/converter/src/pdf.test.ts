import path from "path";
import fs from "fs";
import { pdfToArticle } from "./pdf";

describe("Functions for converting pdf data to articles", () => {

    const sampleBuffer = () =>
        fs.readFileSync(
            path.resolve("src", "pdf-sample.pdf")
        );

    it("is defined and can be called", () => {


        expect(async () => {
            //@ts-ignore 
            await pdfToArticle(sampleBuffer())
        }).not.toThrow();
    });

    it("Does accept a buffer as argument", () => {

        expect(async () => {
            await pdfToArticle(sampleBuffer())
        }).not.toThrow();
    });


    it("Does return some text from an actual pdf", async () => {

        const buffer = sampleBuffer();
        const article = await pdfToArticle(buffer);

        expect(article.text).toBeTruthy();//i.e. is not ""
    });

    it("Does return text containing some of the text from pdf", async () => {

        //NOTE: This tests assumes that the content of the test-PDF is https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf
        const article = await pdfToArticle(sampleBuffer());
        expect(article.text).toContain(
            "Adobe® Portable Document Format (PDF) is a universal file format that preserves all"
        );
    });

    it("Does return a title", async () => {

        const article = await pdfToArticle(sampleBuffer());
        expect(article.title).toBeTruthy();
    });

    it("Does return a timestamp", async () => {

        const article = await pdfToArticle(sampleBuffer());

        expect(typeof article.publication_timestamp).toEqual("number");
        expect(article.publication_timestamp).toBeTruthy();
    });

    it("Does return a timestamp with the correct year", async () => {

        //NOTE: This test assumes a specific sample-pdf; 
        const article = await pdfToArticle(sampleBuffer());
        const year = new Date(article.publication_timestamp).getFullYear();
        expect(year).toEqual(2000);
    });


    it("Does return a timestamp with the correct month", async () => {

        //NOTE: This test assumes a specific sample-pdf; 
        const article = await pdfToArticle(sampleBuffer());
        const month = new Date(article.publication_timestamp).getMonth();
        expect(month).toEqual(5);
    });

    it("Does return an author field with PDF creator", async () => {

        //NOTE: This test assumes a specific sample-pdf; 
        const article = await pdfToArticle(sampleBuffer());
        expect(article.author).toEqual("cdaily");
    });
});