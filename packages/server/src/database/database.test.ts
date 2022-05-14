import { database } from "./database";

describe("The database module", () => {
  jest.mock("klart");
  //jest.spyOn(klart, "withConfiguration").mockImplementation(jest.fn());

  it("Does not throw", () => {
    expect(database()).resolves.not.toThrow();
  });

  it("Returns a database instance", async () => {
    const db = await database();
    expect(db.first).toBeDefined();
    expect(db.rows).toBeDefined();
    expect(db.run).toBeDefined();
  });
});
