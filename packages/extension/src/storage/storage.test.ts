import { chromeStorage, withMockedChrome } from "../test_mock";
import { useLoggedInStorage } from "./storage";

describe("APIs for permanent storage", () => {
  describe("useLoggedInStorage", () => {
    it(
      "Does return functions",
      withMockedChrome(chromeStorage(), () => {
        const [save, retrieve] = useLoggedInStorage();

        expect(typeof save).toEqual("function");
        expect(typeof retrieve).toEqual("function");
      })
    );
  });

  describe("useSessionStorage", () => {
    it(
      "Does return functions",
      withMockedChrome(chromeStorage(), () => {
        const [save, retrieve] = useLoggedInStorage();

        expect(typeof save).toEqual("function");
        expect(typeof retrieve).toEqual("function");
      })
    );
  });
});
