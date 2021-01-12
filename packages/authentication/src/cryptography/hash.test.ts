
import faker from "faker";
import { hash, compare } from "./hash";



describe("Bcrypt module", () => {


    describe("Testing the hash function", () => {

        it("Does change the value", () => {

            const original = faker.lorem.word();
            const hashed = hash(original);

            expect(original).not.toEqual(hashed);
        });
    });

    describe("bcrypt comparing", () => {

        it("Does return true if base value is the same", async () => {

            const value = faker.lorem.word();
            const hashed = await hash(value);

            expect(compare(value, hashed)).resolves.toBe(true);
        });

        it("Does return true if base value is the same", async () => {

            const value = faker.lorem.word();
            const other = faker.lorem.word();

            const hashed = await hash(value);

            expect(value).not.toEqual(other);
            expect(compare(value, hashed)).resolves.toBe(true);
        });
    });
})
