export * as mocks from "./mocks";
export { sleep } from "./sleep";

export const withMockedNodeEnv =
  (value: "production" | "development" | "test", action: () => void) => () => {
    const previous = process.env.NODE_ENV;
    process.env.NODE_ENV = value;
    action();
    process.env.NODE_ENV = previous;
  };
