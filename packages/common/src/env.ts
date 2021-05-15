export const getEnv = <T>(input: T) => {
  Object.keys(input).forEach((key) => {
    if (!process.env[key]) throw `${key} was expected to be in environment`;
  });
  return {};
};
