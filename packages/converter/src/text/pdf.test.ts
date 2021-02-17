import { test } from "@paperpod/common";
import { getTextFromPdfStream, downloadPDF } from "./pdf";

describe("Functions for converting pdf data to articles", () => {

    const convertComplexPDF = async (article = test.mocks.articleWithoutTextualData()) =>
        getTextFromPdfStream(
            article,
            await downloadPDF("https://academicjournals.org/journal/IJCER/article-full-text-pdf/0208F0359126")
        );

    const convertSimplePDF = async (article = test.mocks.articleWithoutTextualData()) =>
        getTextFromPdfStream(
            article,
            await downloadPDF("https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf")
        );

    it("is defined and can be called", () => {


        expect(async () => {
            //@ts-ignore 
            await convertSimplePDF();
        }).not.toThrow();
    });

    it("Does accept a buffer as argument", () => {

        expect(async () => {
            await convertSimplePDF();
        }).not.toThrow();
    });


    it("Does return some text from an actual pdf", async () => {

        const article = await convertSimplePDF();
        expect(article.text).toBeTruthy();//i.e. is not ""
    });

    it("Does return text containing some of the text from pdf", async () => {

        //NOTE: This tests assumes that the content of the test-PDF is https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf
        const article = await convertSimplePDF();
        expect(article.text).toContain(
            "Adobe® Portable Document Format (PDF) is a universal file format that preserves all"
        );
    });

    it("Does return a title", async () => {

        const article = await convertSimplePDF();
        expect(article.title).toBeTruthy();
    });

    it("Does return a timestamp", async () => {

        const article = await convertSimplePDF();

        expect(typeof article.publication_timestamp).toEqual("number");
        expect(article.publication_timestamp).toBeTruthy();
    });

    it("Does return a timestamp with the correct year", async () => {

        //NOTE: This test assumes a specific sample-pdf; 
        const article = await convertSimplePDF();
        const year = new Date(article.publication_timestamp).getFullYear();
        expect(year).toEqual(2000);
    });

    it("Does return a timestamp with the correct month", async () => {

        //NOTE: This test assumes a specific sample-pdf; 
        const article = await convertSimplePDF();
        const month = new Date(article.publication_timestamp).getMonth();
        expect(month).toEqual(5);
    });

    it("Does return an author field with PDF creator", async () => {

        //NOTE: This test assumes a specific sample-pdf; 
        const article = await convertSimplePDF();
        expect(article.author).toEqual("cdaily");
    });

    it("Does not include footnotes in text", async () => {

        const article = await convertComplexPDF();
        expect(article).not.toContain(" it might be easier to position your work if you also tell the reader what your work will not do.");
    });

    it("Does extract author name from complex pdf", async () => {

        const article = await convertComplexPDF();
        expect(article.author).toBe("IEEE");
    });
});