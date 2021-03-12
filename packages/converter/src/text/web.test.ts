import { models, test } from "@paperpod/common";
import { extractTextFromWeb } from "./web";

describe("extracting text", () => {
  jest.mock("puppeteer");

  it("Does mock puppeteer", async () => {
    const content = extractTextFromWeb(test.mocks.article());
    expect(content).toBeDefined();
  });

  it("Does extract text", async () => {
    const textualData = await extractTextFromWeb(test.mocks.article());
    expect(textualData.text).toBeTruthy(); //i.e. not empty string
    expect(typeof textualData.text).toEqual("string");
  });

  it("Does extract title", async () => {
    const textualData = await extractTextFromWeb(test.mocks.article());
    expect(textualData.title).toBeTruthy(); //i.e. not empty string
    expect(typeof textualData.title).toEqual("string");
  });

  it("Does extract author", async () => {
    const textualData = await extractTextFromWeb(test.mocks.article());
    expect(textualData.author).toBeTruthy(); //i.e. not empty string
    expect(typeof textualData.author).toEqual("string");
  });
});
