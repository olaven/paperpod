import faker from "faker";
import express, { Express } from "express";
import { appWithBodyParser } from "./appWithBodyParser";

/*
TODO: move to common test util if useful outside of @paperpod/server
For now, it's just exported here and used in sibling tests. 
*/
export const findInStackOf = (app: Express) =>
    (name: string) =>
        app._router.stack.
            find(middleware => middleware.name === name);

describe("Function adding bodyparser middleware to express app", () => {

    it("Does not throw", () => {

        expect(() => {
            appWithBodyParser()
        }).not.toThrow();
    });


    it("Does have middleware applied", () => {

        const find = findInStackOf(appWithBodyParser());

        expect(find("jsonParser")).toBeDefined();
        expect(find("urlencodedParser")).toBeDefined();
    });

    it("Does accept an existing app", () => {

        const app = express()
        expect(() => {
            appWithBodyParser(
                app
            )
        }).not.toThrow();
    });

    it("Does does not remove any existing middleware", () => {

        const testMiddleware = (request: Express.Request, response: Express.Response, next: () => void) => {
            next();
        }

        const original = express().use(testMiddleware);
        expect(findInStackOf(original)("testMiddleware")).toBeDefined();
        const updated = appWithBodyParser(original);
        expect(findInStackOf(updated)("testMiddleware")).toBeDefined();
    });
});