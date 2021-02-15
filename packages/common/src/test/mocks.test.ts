import faker from "faker";
import { articlePayload } from "./mocks";
import { mocks } from "./test";

describe("The mocks used when testing", () => {

    describe("The mock for user", () => {

        it("does not throw", () => {

            expect(() => {
                mocks.user()
            }).not.toThrow();
        });

        it("Does have defined properties", () => {


            const user = mocks.user();
            expect(user._id).toBeDefined();
            expect(user.email).toBeDefined();
            expect(user.password_hash).toBeDefined();
        });

        it("Does override properties with properties from given template", () => {

            const email = faker.internet.email();
            const user = mocks.user({
                email
            });

            expect(user.email).toEqual(email);
        });
    });

    describe("The mock for credentials", () => {

        it("does not throw", () => {

            expect(() => {
                mocks.credentials()
            }).not.toThrow();
        });

        it("Does have defined properties", () => {

            const credentials = mocks.credentials();
            expect(credentials.email).toBeDefined();
            expect(credentials.password).toBeDefined();
        });

        it("Does override properties with properties from given template", () => {

            const email = faker.internet.email();
            const credentials = mocks.credentials({ email });

            expect(credentials.email).toEqual(email);
        });
    });

    describe("The mock for article", () => {

        it("does not throw", () => {

            expect(() => {
                mocks.article()
            }).not.toThrow();
        });

        it("Does have defined properties", () => {

            const article = mocks.article();
            expect(article._id).toBeDefined();
            expect(article.owner_id).toBeDefined();
            expect(article.original_url).toBeDefined();
            expect(article.title).toBeDefined();
            expect(article.description).toBeDefined();
            expect(article.author).toBeDefined();
            expect(article.text).toBeDefined();
            expect(article.publication_timestamp).toBeDefined();
            expect(article.added_timestamp).toBeDefined();
            expect(article.storage_uri).toBeDefined();
        });

        it("Does override properties with properties from given template", () => {

            const title = faker.lorem.sentence();
            const article = mocks.article({ title });

            expect(article.title).toEqual(title);
        });
    });

    describe("The mock for articlePayload", () => {

        it("does not throw", () => {

            expect(() => {
                mocks.articlePayload()
            }).not.toThrow();
        });

        it("Does have defined properties", () => {

            const payload = mocks.articlePayload();
            expect(payload.link).toBeDefined();
        });

        it("Does override properties with properties from given template", () => {

            const link = faker.internet.url();
            const payload = mocks.articlePayload({ link });
            expect(payload.link).toEqual(link);
        });
    });

})