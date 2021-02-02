import { mocks } from "./test";

describe("The mocks used when testing", () => {

    describe("The mock for user", () => {

        it("does not throw", () => {

            expect(() => {
                mocks.user()
            }).not.toThrow();
        });
    });

    describe("The mock for credentials", () => {

        it("does not throw", () => {

            expect(() => {
                mocks.credentials()
            }).not.toThrow();
        });
    });

    describe("The mock for article", () => {

        it("does not throw", () => {

            expect(() => {
                mocks.article()
            }).not.toThrow();
        });
    });

    describe("The mock for articlePayload", () => {

        it("does not throw", () => {

            expect(() => {
                mocks.articlePayload()
            }).not.toThrow();
        });
    });

})