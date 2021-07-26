import * as middleware from "./middleware";

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
  it("does export withAuthentication", () => {
    expect(middleware.withAuthentication).toBeDefined();
  });

  it("does export withActiveSubscription", () => {
    expect(middleware.withActiveSubscription).toBeDefined();
  });
});
