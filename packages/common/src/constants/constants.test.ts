/**
 * NOTE:
 * Theses tests are meaningless in the sense that they're just
 * asserting that a value indeed has the intended value.
 *
 * However, the tests do add some friction and makes accidental
 * changes harder.
 */

import { withMockedNodeEnv } from "../test/test";
import { APPLICATION_URL, TOKEN_COOKIE_HEADER } from "./constants";

describe("Paperpod constants", () => {
  describe("the application URL", () => {
    it(
      "uses production URL when node env is production",
      withMockedNodeEnv("production", () => {
        expect(process.env.NODE_ENV).toEqual("production");
        expect(APPLICATION_URL()).toEqual("https://paperpod.fm");
      })
    );

    it(
      "uses localhost when node env is test",
      withMockedNodeEnv("test", () => {
        expect(process.env.NODE_ENV).toEqual("test");
        expect(APPLICATION_URL()).toEqual("http://localhost:8080");
      })
    );

    it(
      "uses localhost when node env is development",
      withMockedNodeEnv("development", () => {
        expect(process.env.NODE_ENV).toEqual("development");
        expect(APPLICATION_URL()).toEqual("http://localhost:8080");
      })
    );
  });

  describe("The header name for tokens", () => {
    it("Returns the expected header value", () => {
      expect(TOKEN_COOKIE_HEADER()).toEqual("x-paperpod-token-cookie");
    });
  });
});
