import { useUrl } from "./effects";

describe("Browser extension effects", () => {
  describe("useURL", () => {
    it("does run without throwing", () => {
      expect(() => {
        useUrl();
      }).not.toThrow();
    });
  });
});
