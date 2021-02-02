import faker from "faker";
import { withCollection, persistHandler, getByIdHandler } from "./database";

describe("The mongo handlers, made as helpers for 'withCollection'", () => {

    const randomCollection = withCollection(faker.lorem.word());

    describe("'persistHandler', for persisting documents", () => {

        it("Does not crash", async () => {

            const document = { foo: faker.lorem.sentence() };
            const persisted = await randomCollection(persistHandler(document))

            expect(persisted).toEqual(document);
        });
    });

    describe("'getByIdHandler', for persisting documents", () => {

        it("Does not crash", async () => {

            const persisted = await randomCollection(
                persistHandler({
                    _id: faker.random.alphaNumeric(), foo: faker.lorem.sentence()
                })
            );

            const retrieved = await randomCollection(
                getByIdHandler(persisted._id)
            );

            expect(retrieved).toEqual(persisted);
        });
    });
});