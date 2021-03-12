import express from "express";
import dotenv from "dotenv";
import { appWithEnvironment } from "./appWithEnvironment";
import { findInStackOf } from "./appWithBodyParser.test";

describe("Function providing an app with dotenv loaded", () => {
  it("Does call dotenv", () => {
    const configSpy = jest.spyOn(dotenv, "config");

    expect(configSpy).not.toHaveBeenCalled();
    appWithEnvironment();
    expect(configSpy).toHaveBeenCalledTimes(1);
  });

  it("Does accept an existing app", () => {
    const app = express();
    expect(() => {
      appWithEnvironment(app);
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
    const updated = appWithEnvironment(original);
    expect(findInStackOf(updated)("testMiddleware")).toBeDefined();
  });
});
