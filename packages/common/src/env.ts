type PossibleTypes = string | number;
type Validator = <T extends PossibleTypes>(
  value: any
) => boolean /* value is T */;
//const a: Validator = (p: any): p is string => true;
//a("thing");

export const getEnv = <G extends string, T extends { [key in G]: Validator }>(
  input: T
) =>
  Object.keys(input)
    .map((key: G) => {
      const actualValue = process.env[key];
      if (!actualValue) throw `${key} was expected to be in environment`;

      const validator = input[key];
      if (!validator(actualValue))
        throw `${key} did not match its validator. Found: ${actualValue}`;

      return {
        [key as G]: actualValue,
      };
    })
    .reduce((a, b) => ({
      ...a,
      ...b,
    }));

export const isString = (input: any): boolean /* input is string */ =>
  typeof input === "string" && isNaN(parseInt(input));

const env = getEnv({
  KEY: isString,
});

export const isInteger = (input: any): boolean /* input is number */ =>
  !isNaN(parseInt(input));

const isFloat = (input: any) => parseFloat(input) !== NaN;
const isBetween = (min: number, max: number) => (input: string) => {
  const number = parseFloat(input);
  return number !== NaN || (number < max && number > min);
};
