import { test } from "common";
import { insert, getByEmail } from "./users";

describe("The database interface for users", () => {

    describe("Persisting users", () => {

        it("Is possible to persist without throwing", () => {

            expect(
                insert(test.mocks.user())
            ).resolves.not.toThrow();
        });

        it("Is possible to retrieve the user after persisting", async () => {

            const persisted = await insert(test.mocks.user());
            const retrieved = await getByEmail(persisted.email);

            expect(retrieved).toBeDefined();
            expect(persisted).toEqual(retrieved);
        });
    });

    describe("Retrieving users by email", () => {

        it("Does return a user with the same email", async () => {

            const persisted = await insert(test.mocks.user());
            const retrieved = await getByEmail(persisted.email);

            expect(retrieved.email).toEqual(persisted.email);
        });

        it("Does not return other users, even though they are present", async () => {

            const first = await insert(test.mocks.user());
            const second = await insert(test.mocks.user());

            expect(first).not.toEqual(second);

            const retrieved = await getByEmail(first.email);
            expect(retrieved).toEqual(first);
            expect(retrieved).not.toEqual(second);

        });
    });
})