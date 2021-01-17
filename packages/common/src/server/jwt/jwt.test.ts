import { models, test } from "@paperpod/common";
import { sleep } from "../../test/test";
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

        it("Does create a different token if created at a different time", async () => {

            const first = sign({});
            await sleep(1500); //>1s, for token `iat` (issued at) to be updated
            const second = sign({});

            expect(first).not.toEqual(second);
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