import { getEnv } from "./env";
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
        NOT_IN_ENV: "string",
      });
    }).toThrow();
  });

  it("throws with appropriate error if key is not in the environment", () => {
    expect(() => {
      getEnv({
        NOT_IN_ENV: "string",
      });
    }).toThrowError(`NOT_IN_ENV was expected to be in environment`);
  });

  const withEnvironment = <T>(
    environment: T,
    action: (environment: T) => void
  ) => () => {
    const previousEnv = process.env;
    process.env = (environment as any) as NodeJS.ProcessEnv;

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
  });
});
