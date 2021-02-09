import * as kall from "node-kall";
import { test } from "@paperpod/common";
import * as pdf from "./pdf";
import * as web from "./web";
import { withTextualData } from "./text";

describe("Function for text extraction", () => {

    const mockExtraction = () => {

        return [
            jest.spyOn(pdf, "extractTextFromPDF"),
            jest.spyOn(web, "extractTextFromWeb"),
        ]
    };

    beforeEach(() => {

        jest.resetAllMocks();
        jest.mock("node-kall");

        //re-mock in test if the spy methods are needed
        mockExtraction();
    });


    it("Does not throw", () => {

        mockExtraction();

        expect(

            withTextualData(
                test.mocks.article()
            )
        ).resolves.not.toThrow();
    });


    it("Chooses web on a random url", async () => {

        const [pdfSpy, webSpy] = mockExtraction();

        await withTextualData(test.mocks.articleWithoutTextualData());

        expect(pdfSpy).toHaveBeenCalledTimes(0);
        expect(webSpy).toHaveBeenCalledTimes(1);
    });

    it("Chooses PDF if the URL ends with .pdf", async () => {

        const [pdfSpy, webSpy] = mockExtraction();
        await withTextualData({
            ...test.mocks.articleWithoutTextualData(),
            original_url: "https://example.com/file.pdf"
        });

        expect(pdfSpy).toHaveBeenCalledTimes(1);
        expect(webSpy).toHaveBeenCalledTimes(0);
    });

    it("Chooses PDF if the URL ends with .PDF", async () => {

        const [pdfSpy, webSpy] = mockExtraction();
        await withTextualData({
            ...test.mocks.articleWithoutTextualData(),
            original_url: "https://example.com/file.PDF"
        });

        expect(pdfSpy).toHaveBeenCalledTimes(1);
        expect(webSpy).toHaveBeenCalledTimes(0);
    });

    it("Does not check endpoint if the path ends in .pdf", async () => {

        mockExtraction();
        const get = jest.spyOn(kall, "get");

        await withTextualData({
            ...test.mocks.articleWithoutTextualData(),
            original_url: "https://example.com/file.pdf"
        });

        expect(get).not.toHaveBeenCalled();
    });

    it("Does check endpoint if the path does not end with .pdf", async () => {

        mockExtraction();
        const get = jest.spyOn(kall, "get");

        await withTextualData({
            ...test.mocks.articleWithoutTextualData(),
            original_url: "https://example.com/file"
        });

        expect(get).toHaveBeenCalledTimes(1);
    });

    it("Does check endpoint if the path does not end with .PDF", async () => {

        mockExtraction();
        const get = jest.spyOn(kall, "get");

        await withTextualData({
            ...test.mocks.articleWithoutTextualData(),
            original_url: "https://example.com/file"
        });

        expect(get).toHaveBeenCalledTimes(1);
    });
});