import { test } from "@paperpod/common";
import { getById, persist, deleteById } from "./articles";
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
        });
    });

    describe("Deleting an article by id", () => {

        it("Does actually remove on delete", async () => {

            const persisted = await persist(test.mocks.article());
            const before = await getById(persisted._id);
            expect(persisted._id).toEqual(before._id);

            await deleteById(before._id);

            const after = await getById(persisted._id);
            expect(after).toBeNull();
        })
    });
});