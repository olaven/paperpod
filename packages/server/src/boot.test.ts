import supertest from "supertest";
import { OK } from "node-kall";
import { appWithEnvironment } from "./app/app";
import { test } from "@paperpod/common";
import { boot } from "./boot";

describe("The function for booting apps at specific paths", () => {
  it("Does not crash", () => {
    expect(() => {
      boot("/path").close();
    }).not.toThrow();
  });

  it("Does accept a preconfigured app", () => {
    expect(() => {
      const app = appWithEnvironment();
      boot("/path", app).close();
    }).not.toThrow();
  });

  it("Does run for a while", async () => {
    const server = boot("/path", appWithEnvironment());
    await test.sleep(2500);
    expect(() => {
      server.close();
    }).not.toThrow();
  });

  it("Does register an app with a health endpoint", async () => {
    const app = boot("/path");
    const { status } = await supertest(app).get("/path/health");
    expect(status).toEqual(OK);
    app.close();
  });
});
