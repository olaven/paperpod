import faker from "faker";
import { getEnv, isString, isInteger } from "./env";
describe("the module for picking up env variables", () => {
  it("is a function does not return null", () => {
    const env = getEnv({});
    expect(env).not.toBeNull();
  });

  it("is a function that does not return undefined", () => {
    const env = getEnv({});
    expect(env).not.toBeUndefined();
  });

  it("throws if one of its input is not in the env", () => {
    expect(() => {
      getEnv({
        NOT_IN_ENV: isString,
      });
    }).toThrow();
  });

  it("throws with appropriate error if key is not in the environment", () => {
    expect(() => {
      getEnv({
        NOT_IN_ENV: isString,
      });
    }).toThrowError(`NOT_IN_ENV was expected to be in environment`);
  });

  const withEnvironment =
    <T>(environment: T, action: (environment: T) => void) =>
    () => {
      const previousEnv = process.env;
      process.env = environment as any as NodeJS.ProcessEnv;

      action(environment);
      process.env = previousEnv;
    };

  describe("withEnvironment helper", () => {
    it(
      "does change process.env",
      withEnvironment(
        {
          TEST: "value",
        },
        (environment) => {
          expect(process.env.TEST).toEqual("value");
        }
      )
    );

    it(
      "does return test key in callback",
      withEnvironment(
        {
          KEY_NAME: "TEST_VALUE",
        },
        (environment) => {
          expect(environment.KEY_NAME).toEqual("TEST_VALUE");
        }
      )
    );

    it(
      "returns environment exactly equal to process.env",
      withEnvironment(
        {
          KEY: "VALUE",
        },
        (environment) => {
          expect(environment).toEqual(process.env);
        }
      )
    );

    it(
      "does not have other keys in env than the ones specified",
      withEnvironment({ KEY: "VALUE" }, (environment) => {
        expect(process.env).toEqual({ KEY: "VALUE" });
      })
    );
    it(
      "does not have any other keys in object than the ones specified",
      withEnvironment(
        {
          KEY: "VALUE",
        },
        (environment) => {
          expect(environment).toEqual({ KEY: "VALUE" });
        }
      )
    );

    it(
      "Does return an object with the KEY from input",
      withEnvironment({ KEY: "VALUE" }, () => {
        const env = getEnv({ KEY: isString });
        expect(env.KEY).toBeDefined();
        expect(env.KEY).toEqual("VALUE");
      })
    );

    it(
      "Accepts key with type of Validator",
      withEnvironment({ API_KEY: "some_key" }, () => {
        const env = getEnv({ API_KEY: isString });
        expect(env.API_KEY).toBeDefined();
      })
    );

    it(
      "Does not accept an argument that's not a validator",
      withEnvironment({ PORT: faker.datatype.number() }, () => {
        expect(() => {
          //@ts-expect-error
          getEnv({ PORT: "NOT_A_VALIDATOR" });
        }).toThrow(); //will throw because "NOT_A_VALIDATOR" is not a function
      })
    );

    it("Does return a value with the expeted type", () =>
      withEnvironment({ PORT: faker.datatype.number() }, () => {
        const acceptingNumber = (input: number) => {};
        const env = getEnv({ PORT: isInteger });

        //NOTE: if this does not compile, consider test failing
        acceptingNumber(env.PORT);
      }));

    describe("isInteger validator", () => {
      it(
        "Fails if is not number",
        withEnvironment({ PORT: faker.lorem.word(10) }, (environment) => {
          expect(() => {
            getEnv({ PORT: isInteger });
          }).toThrowError(
            `PORT did not match its validator. Found: ${environment.PORT}`
          );
        })
      );

      it(
        "Does not fail if it is an integer",
        withEnvironment({ PORT: faker.datatype.number() }, () => {
          expect(() => {
            getEnv({ PORT: isInteger });
          }).not.toThrow();
        })
      );
    });
  });
});
