import faker from "faker";
import { limitCharLength, voiceFromLanguage } from "./audio";

describe("Functions related to converting text to audio", () => {


    jest.mock("node-kall");

    const randomString = (length: number) =>
        new Array(length)
            .fill(undefined)
            .map(() => faker.random.alphaNumeric(1))
            .join("")

    describe("Function making sure text is within Google Cloud limits", () => {

        it("does strip away when too long", () => {

            const text = randomString(5000);
            const applied = limitCharLength(text);

            expect(text.length).toEqual(5000);
            expect(applied.length).toEqual(1500);
        });

        it("Does keep the first 1500 characters of array", () => {

            const text = randomString(2000);
            const applied = limitCharLength(text);
            expect(text.startsWith(applied)).toBe(true);
        });

        it("Does not change strings <= 1500 in length", () => {

            const text = randomString(1499);
            const applied = limitCharLength(text);

            expect(text).toEqual(applied);
        });
    });

    describe("Mapping between langauge code and voice", () => {

        it("Does get correct voide for a given language", () => {

            [
                ["en", "Joanna"],
                ["no", "Liv"],
                ["ar", "Zeina"],
                ["zh", "Zhiyu"],
                ["da", "Naja"],
                ["nl", "Lotte"],
                ["fr", "Léa"],
                ["de", "Marlene"],
                ["hi", "Aditi"],
                ["is", "Dóra"],
                ["it", "Carla"],
                ["ja", "Mizuki"],
                ["ko", "Seoyeon"],
                ["pl", "Ewa"],
                ["pt", "Camila"],
                ["ro", "Carmen"],
                ["ru", "Tatyana"],
                ["es", "Conchita"],
                ["sv", "Astrid"],
                ["tr", "Filiz"],
                ["cy", "Gwyneth"],
            ].forEach(([code, voice]) => {

                expect(
                    voiceFromLanguage(code)
                ).toEqual(voice)
            });
        });

        it("Does deafult to english", () => {

            expect(
                voiceFromLanguage(
                    faker.lorem.word()
                )
            ).toEqual("Joanna") //i.e. english voice
        });
    });
})