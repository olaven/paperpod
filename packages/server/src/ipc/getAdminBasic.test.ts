import { getAdminBasic } from "./getAdminBasic";

const withMockedEnv =
  (overrides: Record<string, string>, action: () => void) => () => {
    const previous = process.env;
    process.env = {
      ...process.env,
      ...overrides,
    };
    action();
    process.env = previous;
  };

describe("Getting basic auth with admin credentials", () => {
  it("Does not throw", () => {
    expect(getAdminBasic).not.toThrow();
  });

  it("Returns a defined Authorization header", () => {
    const {
      headers: { Authorization },
    } = getAdminBasic();

    expect(Authorization).toBeDefined();
  });

  it("Returns a header that looks like a basic auth", () => {
    const {
      headers: { Authorization },
    } = getAdminBasic();

    expect(Authorization).toEqual(
      `Basic ${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}`
    );
  });

  it("Throws if ADMIN_USERNAME is missing", () => {
    withMockedEnv({ ADMIN_USERNAME: undefined }, () => {
      expect(getAdminBasic()).toThrow();
    });
  });

  it("Throws if ADMIN_PASSWORD is missing", () => {
    withMockedEnv({ ADMIN_PASSWORD: undefined }, () => {
      expect(getAdminBasic()).toThrow();
    });
  });
});
