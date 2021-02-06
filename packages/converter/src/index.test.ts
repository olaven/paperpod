import * as index from "./index";

describe("Exported data from index.ts", () => {

    describe("Functions exported through converter", () => {

        it("Does export withStorageUri", () => {

            expect(index.withStorageUri).toBeDefined();
        })
        it("Does export withTextualData", () => {

            expect(index.withTextualData).toBeDefined();
        })
        it("Does export getRSSFeed", () => {

            expect(index.getRSSFeed).toBeDefined();
        })
        it("Does export getAudioStream", () => {

            expect(index.getAudioStream).toBeDefined();
        })

    })
})