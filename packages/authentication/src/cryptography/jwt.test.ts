import { models, test } from "common";
import { sign, decode } from "./jwt";

const replaceAt = (string: string, index: number, replacement: string) =>
    string.substr(0, index) + replacement + string.substr(index + replacement.length);


describe("Functions for working with JSON Web Tokens", () => {


    describe("Signing tokens", () => {

        it("Does return a string", () => {

            const data = { foo: 'bar' };
            const token = sign(data);

            expect(typeof token).toEqual('string');
        });
    });

    describe("Decoding the tokens", () => {

        it("Does decode to same object", () => {

            const user = test.mocks.user();
            const token = sign(user);
            const decoded = decode<models.User>(token);

            expect(decoded).toEqual(user);
        });

        it("Fails if just one character of the token is changed", () => {

            const data = test.mocks.user();
            const token = sign(data);

            const newToken = replaceAt(token, 2, 's');

            //NOTE: may fail due to random chance. 
            expect(token).not.toEqual(newToken);

            expect(() => {

                decode(newToken);
            }).toThrow();
        });
    });


});