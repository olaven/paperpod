import { test } from "@paperpod/common";
import { getTextFromPdfStream, downloadPDF } from "./pdf";

describe("Functions for converting pdf data to articles", () => {
  const convertComplexPDF = async (
    article = test.mocks.articleWithoutTextualData()
  ) =>
    getTextFromPdfStream(
      article,
      await downloadPDF(
        "https://academicjournals.org/journal/IJCER/article-full-text-pdf/0208F0359126"
      )
    );

  const convertSimplePDF = async (
    article = test.mocks.articleWithoutTextualData()
  ) =>
    getTextFromPdfStream(
      article,
      await downloadPDF("https://olaven.org/assets/documents/CV.pdf")
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
    expect(article.text).toBeTruthy(); //i.e. is not ""
  });

  it("Does return text containing some of the text from pdf", async () => {
    //NOTE: This tests assumes that the content of the test-PDF is https://olaven.org/assets/documents/CV.pdf
    const article = await convertSimplePDF();
    expect(article.text).toContain("Curriculum Vitae");
  });

  it("Does return a title", async () => {
    const article = await convertComplexPDF();
    expect(article.title).toBeTruthy();
  });

  it("Does return a time", async () => {
    const article = await convertSimplePDF();

    expect(typeof article.publication_time).toEqual("object");
    const timestamp = article.publication_time.getTime();
    expect(typeof timestamp).toEqual("number");

    expect(article.publication_time).toBeTruthy();
  });

  it("Does return a time with the correct year", async () => {
    //NOTE: This test assumes a specific sample-pdf: https://olaven.org/assets/documents/CV.pdf
    const article = await convertSimplePDF();
    const year = article.publication_time.getFullYear();
    expect(year).toEqual(2023);
  });

  it("Does return a time with the correct month", async () => {
    //NOTE: This test assumes a specific sample-pdf: https://olaven.org/assets/documents/CV.pdf
    const article = await convertSimplePDF();
    const month = article.publication_time.getMonth();
    expect(month).toEqual(0);
  });

  it("Does return an author field with PDF creator", async () => {
    //NOTE: This test assumes a specific sample-pdf;
    const article = await convertComplexPDF();
    expect(article.author).toEqual("IEEE");
  });

  it("Does not include footnotes in text", async () => {
    const article = await convertComplexPDF();
    expect(article).not.toContain(
      " it might be easier to position your work if you also tell the reader what your work will not do."
    );
  });

  it("Does extract author name from complex pdf", async () => {
    const article = await convertComplexPDF();
    expect(article.author).toBe("IEEE");
  });
});
