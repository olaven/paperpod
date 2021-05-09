import faker from "faker";
import { singleton } from "./migrate";

describe("Database migrations", () => {
  describe("The singleton util", () => {
    it("Does return a function that can be called", () => {
      const action = jest.fn();
      const customSingleton = singleton(action);
      customSingleton(null);
      expect(action).toHaveBeenCalled();
    });

    it("Does only call the callback once", () => {
      const action = jest.fn();
      const customSingleton = singleton(action);
      const callCount = faker.datatype.number({ min: 2, max: 20 });
      new Array(callCount).fill(null).forEach(() => {
        customSingleton(null);
      });

      expect(action).toHaveBeenCalledTimes(1);
      expect(callCount).toBeGreaterThan(1);
    });
  });
});
