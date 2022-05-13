import faker from "faker";
import path from "path";
import fs from "fs";
import { readMigrationFile, SchemaName } from "./migrate";

describe("Database migrations", () => {
  describe("Function for reading the migration file", () => {
    const randomSchema = () => {
      const array: SchemaName[] = ["api", "authentication"];
      const schema = array[Math.floor(Math.random() * array.length)];
      return schema;
    };

    const mockIO = (
      resolve: jest.Mock = jest.fn((...parts: string[]) => "default/test/path"),
      readFileSync: jest.Mock = jest.fn((path: string) =>
        Buffer.from("default file content")
      )
    ) => {
      global.__dirname = "test-dirname";
      jest.spyOn(path, "resolve").mockImplementation(resolve);
      jest.spyOn(fs, "readFileSync").mockImplementation(readFileSync);

      return { resolve, readFileSync };
    };

    it("Does call path resolve", async () => {
      const { resolve } = mockIO();
      await readMigrationFile(randomSchema());
      expect(resolve).toHaveBeenCalled();
    });

    it("Does call path readFileSync", async () => {
      const { readFileSync } = mockIO();
      await readMigrationFile(randomSchema());
      expect(readFileSync).toHaveBeenCalled();
    });

    it("Does resolve a file matchint schema + .sql", async () => {
      const { resolve } = mockIO();
      const schema = randomSchema();
      await readMigrationFile(schema);

      expect(resolve).toHaveBeenLastCalledWith(__dirname, `${schema}.sql`);
    });

    it("Does return the plaintext content of migration file", async () => {
      const content = faker.lorem.paragraphs(5);
      mockIO(
        jest.fn(() => "path"),
        jest.fn(() => content)
      );

      const recieved = await readMigrationFile(randomSchema());
      expect(recieved).toEqual(content);
    });
  });
});
