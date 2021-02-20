/**
 * NOTE:
 * Theses tests are meaningless in the sense that they're just
 * asserting that a value indeed has the intended value.
 *
 * However, the tests do add some friction and makes accidental
 * changes harder.
 */

import { APPLICATION_URL } from "./constants";

describe("Paperpod constants", () => {

    it("has expected application url", () => {

        expect(APPLICATION_URL).toEqual("https://application.paperpod.fm");
    });
});