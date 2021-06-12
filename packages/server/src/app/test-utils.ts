import express, { Express } from "express";

import { appWithDevCors } from "./appWithDevCors";
/*
TODO: move to common test util if useful outside of @paperpod/server
For now, it's just exported here and used in sibling tests. 
*/
export const findInStackOf = (app: Express) => (name: string) =>
  app._router.stack.find((middleware) => middleware.name === name);

export const runCommonAppTests = (app: (app?: Express) => Express) => {
  it("Does not throw", () => {
    expect(() => {
      app();
    }).not.toThrow();
  });

  it("Does accept an existing app", () => {
    const _app = express();
    expect(() => {
      app(_app);
    }).not.toThrow();
  });

  it("Does does not remove any existing middleware", () => {
    const testMiddleware = (
      request: Express.Request,
      response: Express.Response,
      next: () => void
    ) => {
      next();
    };

    const original = express().use(testMiddleware);
    expect(findInStackOf(original)("testMiddleware")).toBeDefined();
    const updated = app(original);
    expect(findInStackOf(updated)("testMiddleware")).toBeDefined();
  });
};
