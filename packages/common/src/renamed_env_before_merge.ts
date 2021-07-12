import { logger } from "./logger/logger";

/**
 * IF this works, create new module
 */
/* type Specification =
  | "string"
  | "number"
  | string[]
  | [min: number, max: number];
const _env = <T extends string>(input: { [key in T]: Specification }) => {};

type SecondSpecification =
  | "string"
  | "number"
  | `between ${number} and ${number}`;

const _around = <T extends Specification>(
  input: { [key in SecondSpecification]: string }
) => {};

const envs = ["test", "development", "production"] as const;
type Env = typeof envs[number];

type MyEnvironment = "PORT" | "API_KEY" | "AGE";
const env = _env<MyEnvironment>({
  PORT: "number",
  AGE: [13, 99],
  API_KEY: "string",
});
 */
/* type Validator = (key: string) => boolean;
const _validator = <T extends string>(input: { [key in T]: Validator }) => {
  Object.keys(input).map((key) => {
    const validator = input[key] as Validator;
    const value = process.env[key];
    if (!validator(value))
      throw `${key} in env did not pass validator. (value: ${value})`;
  });
};
 */
/* const guarantee = <T>(value: any, boolean: boolean): value is T => boolean;

const validators = {
  string: <T extends string>(value: T): T => {
    guarantee(value, typeof value === "string");
    return value;
  },
  number: <T extends string>(value: T): number => {
    if (!guarantee<number>(value, parseInt(value) !== NaN)) throw "";
    return value;
  },
  range: <T extends number>(from: number, to: number) => (
    value: any
  ): number => {
    if (
      !guarantee<T>(
        value,
        validators.number(value) && value >= from && value < to
      )
    )
      throw "";
    return value;
  },
};

_validator({
  PORT: validators.range(8000, 9000),
  SERIAL: validators.number,
  API_KEY: validators.string,
}); */

type Validators = {
  number: () => Validator<number>;
  string: () => Validator<string>;
  range: (from: number, to: number) => Validator<number>;
  oneof: <T extends string>(values: T) => Validator<T>;
};
const validators: Validators = {
  number: () => (value: string) => {
    //TODO: validate
    return () => -1;
  },
  string: () => (value: string) => {
    //TODO: validate
    return () => value;
  },
  range: (from: number, to: number) => (value: string) => {
    //TODO: value
    return () => -1;
  },
  oneof: <T extends string>(values: string) => () => {
    //TODO: validate
    return () => null as T;
  },
};

type Validator<G> = (input: string) => () => G;
const _env = <T extends string>(
  input: { [key in T]: Validator<any> }
): {
  [key in T]: any;
} => {
  return Object.keys(input)
    .map((key: T) => ({ key, get: input[key](key) }))
    .map((a) => ({
      [a.key]: a.get,
    }))
    .reduce((a, b) => ({
      ...a,
      ...b,
    })) as {
    [key in T]: any;
  };
};

const env = _env({
  PORT: validators.range(100, 200),
  API_KEY: validators.range(1, 2),
  //API_KEY: validators.string(),
});

//FIXME: values are any..
const getPort = validators.range(1, 2)(process.env.PORT);
const port = getPort();
console.log(port);
