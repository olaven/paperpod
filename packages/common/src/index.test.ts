import * as index from "./index";
/**
 * NOTE:
 * This file just checks that the
 * modules that are expected to be exported,
 * actually are exported.
 *
 * The idea is to increase general friction in the codebase
 * , making it harder to accidentally remove something.
 */

describe("The exported modules from index", () => {
  it("does export models", () => {
    expect(index.models).toBeDefined();
  });
  it("does export validators", () => {
    expect(index.validators).toBeDefined();
  });
  it("does export constants", () => {
    expect(index.constants).toBeDefined();
  });
  it("does export logger", () => {
    expect(index.logger).toBeDefined();
  });
  it("does export test", () => {
    expect(index.test).toBeDefined();
  });
});
