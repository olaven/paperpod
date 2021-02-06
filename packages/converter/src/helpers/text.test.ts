import faker from "faker";
import { getTextualData } from "./text";


describe("extracting text", () => {

    jest.mock("puppeteer");

    it("Does mock puppeteer", async () => {

        const content = getTextualData(faker.internet.url());
        expect(content).toBeDefined();
    });

    it("Does extract text", async () => {

        const textualData = await getTextualData(faker.internet.url());
        expect(textualData.text).toBeTruthy(); //i.e. not empty string 
        expect(typeof textualData.text).toEqual("string");
    });

    it("Does extract title", async () => {

        const textualData = await getTextualData(faker.internet.url());
        expect(textualData.title).toBeTruthy(); //i.e. not empty string 
        expect(typeof textualData.title).toEqual("string");
    });

    it("Does extract author", async () => {

        const textualData = await getTextualData(faker.internet.url());
        expect(textualData.author).toBeTruthy(); //i.e. not empty string 
        expect(typeof textualData.author).toEqual("string");
    });
}); 