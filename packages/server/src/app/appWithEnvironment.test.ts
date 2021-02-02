import dotenv from "dotenv";
import { appWithEnvironment } from "./appWithEnvironment";

describe("Function providing an app with dotenv loaded", () => {

    it("Does call dotenv", () => {

        const configSpy = jest.spyOn(dotenv, "config");

        expect(configSpy).not.toHaveBeenCalled();
        appWithEnvironment();
        expect(configSpy).toHaveBeenCalledTimes(1);
    });
});