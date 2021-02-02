import { Express } from "express";
import { appWithBodyParser } from "./appWithBodyParser";

/*
TODO: move to common test util if useful outside of @paperpod/server
For now, it's just exported here and used in sibling tests. 
*/
const findInStackOf = (app: Express) =>
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
});