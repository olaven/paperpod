import { appWithCookieParser } from "./appWithCokieParser";
import { findInStackOf, runCommonAppTests } from "./test-utils";

describe("Function adding bodyparser middleware to express app", () => {
  runCommonAppTests(appWithCookieParser);

  it("Does have middleware applied", () => {
    const find = findInStackOf(appWithCookieParser());

    expect(find("cookieParser")).toBeDefined();
  });
});
