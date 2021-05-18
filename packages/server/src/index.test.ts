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
  it("does export app", () => {
    expect(index.app).toBeDefined();
  });
  it("does export boot", () => {
    expect(index.boot).toBeDefined();
  });
  it("does export jwt", () => {
    expect(index.jwt).toBeDefined();
  });
  it("does export middlware", () => {
    expect(index.middleware).toBeDefined();
  });
  it("does export database", () => {
    expect(index.database).toBeDefined();
  });
});
