import express from "express";
import dotenv from "dotenv";
import { appWithEnvironment } from "./appWithEnvironment";
import { findInStackOf } from "./appWithBodyParser.test";
import { runCommonAppTests } from "./test-utils";

describe("Function providing an app with dotenv loaded", () => {
  runCommonAppTests(appWithEnvironment);
  it("Does call dotenv", () => {
    const configSpy = jest.spyOn(dotenv, "config");

    expect(configSpy).not.toHaveBeenCalled();
    appWithEnvironment();
    expect(configSpy).toHaveBeenCalledTimes(1);
  });
});
