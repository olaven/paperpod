import { Express } from "express";
import { appWithBodyParser } from "./appWithBodyParser";
import { runCommonAppTests } from "./test-utils";

/*
TODO: move to common test util if useful outside of @paperpod/server
For now, it's just exported here and used in sibling tests. 
*/
export const findInStackOf = (app: Express) => (name: string) =>
  app._router.stack.find((middleware) => middleware.name === name);

describe("Function adding bodyparser middleware to express app", () => {
  runCommonAppTests(appWithBodyParser);

  it("Does have middleware applied", () => {
    const find = findInStackOf(appWithBodyParser());

    expect(find("jsonParser")).toBeDefined();
    expect(find("urlencodedParser")).toBeDefined();
  });
});
