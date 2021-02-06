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

    it("Does return an Article", async () => {

        const article = await pdfToArticle(sampleBuffer());
        expect(article._id).toBeDefined();
        expect(article.owner_id).toBeDefined();
        expect(article.original_url).toBeDefined();
        expect(article.title).toBeDefined();
        expect(article.description).toBeDefined();
        expect(article.author).toBeDefined();
        expect(article.text).toBeDefined();
        expect(article.publication_timestamp).toBeDefined();
        expect(article.added_timestamp).toBeDefined();
        expect(article.storage_uri).toBeDefined();
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
    })
});