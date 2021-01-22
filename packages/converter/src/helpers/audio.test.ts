import faker from "faker";
import { applyTranslateLimit } from "./audio";

describe("Functions related to converting text to audio", () => {

    const randomString = (length: number) =>
        new Array(length)
            .fill(undefined)
            .map(() => faker.random.alphaNumeric(1))
            .join("")

    describe("Function making sure text is within Google Cloud limits", () => {

        it("does strip away when too long", () => {

            const text = randomString(5000);
            const applied = applyTranslateLimit(text);

            expect(text.length).toEqual(5000);
            expect(applied.length).toEqual(1500);
        });

        it("Does keep the first 1500 characters of array", () => {

            const text = randomString(2000);
            const applied = applyTranslateLimit(text);
            expect(text.startsWith(applied)).toBe(true);
        });

        it("Does not change strings <= 1500 in length", () => {

            const text = randomString(1499);
            const applied = applyTranslateLimit(text);

            expect(text).toEqual(applied);
        });
    });
})