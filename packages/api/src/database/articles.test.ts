import { test } from "@paperpod/common";
import { getById, persist } from "./articles";
describe("The database interface for articles", () => {

    describe("Getting articles by id", () => {

        it("Does get an article", async () => {

            const persisted = await persist(test.mocks.article());
            const retrieved = await getById(persisted._id);

            expect(persisted).toEqual(retrieved);
        });

        it("Does not return another aticle if there are multiple present", async () => {

            await persist(test.mocks.article());
            const persisted = await persist(test.mocks.article());
            await persist(test.mocks.article());

            const retrieved = await getById(persisted._id);
            expect(persisted).toEqual(retrieved);
        });

        it("Does return a defined article", async () => {

            const persisted = await persist(test.mocks.article());
            const retrieved = await getById(persisted._id);

            expect(persisted).toBeDefined();
            expect(persisted._id).toBeDefined();
        })
    });
});