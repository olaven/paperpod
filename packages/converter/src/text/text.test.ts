import { test } from "@paperpod/common";
import { withTextualData } from "./text";

describe("Function for text extraction", () => {

    it("Does not throw", () => {

        expect(

            withTextualData(
                test.mocks.article()
            )
        ).resolves.not.toThrow();
    });
});