import faker from "faker";
import express, { Express } from "express";
import { appWithDevCors } from "./appWithDevCors";
import { findInStackOf } from "./appWithBodyParser.test";
import { runCommonAppTests } from "./test-utils";

describe("Function adding bodyparser middleware to express app", () => {
  runCommonAppTests(appWithDevCors);
});
