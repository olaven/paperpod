import { getAdminBasic } from "./getAdminBasic";

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
});
