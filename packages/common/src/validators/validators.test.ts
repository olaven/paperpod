import faker from "faker";
import { validatePassword } from "./validators";

//https://stackoverflow.com/questions/20333654/array-map-doesnt-seem-to-work-on-uninitialized-arrays/42750274
const array = (length: number) => new Array(length).fill(null);

const generatePassword = (length = faker.random.number({ min: 0, max: 200 })) =>
  faker.internet.password().substr(0, length);

describe("Common validators", () => {
  describe("The password validator", () => {
    it("Does not throw on call", () => {
      expect(() => validatePassword("some password")).not.toThrow();
    });

    it("Returns false on a password shorter than 8 characters", () => {
      array(7)
        .map((_, i) => i)
        .forEach((i) => {
          const password = generatePassword(i);
          expect(password.length).toEqual(i);
          expect(validatePassword(password)).toBe(false);
        });
    });

    it("Returns false on a password not containing any number", () => {
      const password = faker.random.alpha({
        count: faker.random.number({ min: 8 }),
      });
      expect(validatePassword(password)).toEqual(false);
    });

    it("Returns true on a strong password with 8 characters", () => {
      const password = "SomeP4ss";
      expect(/[a-z]/.test(password)).toEqual(true);
      expect(/[A-Z]/.test(password)).toEqual(true);
      expect(/[0-9]/.test(password)).toEqual(true);

      expect(validatePassword(password)).toEqual(true);
    });
  });
});
