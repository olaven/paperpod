import faker from "faker";
import { database } from "./database";
import { validSchemaNames } from "./migrate";

export const withMockedSchemaVariable = async (schema: string | undefined, action: () => void | Promise<void>) => async () => {
  const original = global.process.env.PAPERPOD_SCHEMA; 
  global.process.env.PAPERPOD_SCHEMA = schema; 
  await action();
  global.process.env.PAPERPOD_SCHEMA = original
};

describe("The database module", () => {
  jest.mock("klart");
  //jest.spyOn(klart, "withConfiguration").mockImplementation(jest.fn());

  it(`Does not throw for values in ${validSchemaNames}`, () => {
    for (const schema of validSchemaNames ) {
      withMockedSchemaVariable(schema, () => {
        expect(() => database()).not.toThrow()
      });
    }
  });

  it("Throws if the schema name is not a valid one" , () => {

    const schema = faker.name.firstName()
    withMockedSchemaVariable(schema, () => {
      expect(() => database()).rejects.toThrow(`Schema ${schema} not one of`)
    }); 
  }); 

  it("Throws if the schema name is not defined" , () => {

    const schema = undefined; 
    withMockedSchemaVariable(schema, () => {
      expect(() => database()).rejects.toThrow(`Schema needs to be defined in env: undefined`)
    });
  }); 

  it("Returns a database instance", async () => {
    const db = await database();
    expect(db.first).toBeDefined();
    expect(db.rows).toBeDefined();
    expect(db.run).toBeDefined();
  });
});
