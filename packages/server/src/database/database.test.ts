import klart from "klart";
import { database } from "./database";

describe("The database module", () => {
  jest.mock("klart");
  //jest.spyOn(klart, "withConfiguration").mockImplementation(jest.fn());

  it("Does not throw", () => {
    expect(database()).resolves.not.toThrow();
  });
});
