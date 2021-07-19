import supertest from "supertest";
import { NOT_IMPLEMENTED, FORBIDDEN, NOT_FOUND, OK } from "node-kall";
import faker from "faker";
import { models, test } from "@paperpod/common";
import { internalUserApp } from "../../internal-user-app";
import { users } from "../../authdatabase/authdatabase";

describe("Internal route for getting user subscription status", () => {
  const get = ({
    user,
    username,
    password,
  }: {
    user?: models.User;
    username?: string;
    password?: string;
  } = {}) =>
    supertest(internalUserApp)
      .get(`/users/${user ? user.id : faker.datatype.uuid()}/subscription`)
      .set(
        "Authorization",
        `Basic ${username ?? faker.internet.userName()}:${
          password ?? faker.internet.password()
        }`
      );

  /*
   * updating sub and inserting user is
   * separated in the code for the sake
   * of being explicit about critical operations.
   */
  const insertUserWithSubscription = async (
    subscription: "active" | "inactive"
  ) => {
    return await users.setSubscriptionStatus({
      ...(await users.insert(test.mocks.user())),
      subscription,
    });
  };

  it("Does not respond with NOT_IMPLEMENTED", async () => {
    const { status } = await get();
    expect(status).not.toEqual(NOT_IMPLEMENTED);
  });

  it("Does respond with FORBIDDEN on invalid credentials", async () => {
    const { status } = await get({
      username: faker.internet.userName(),
      password: faker.internet.password(),
    });
    expect(status).toEqual(FORBIDDEN);
  });

  it("Does respond with NOT_FOUND if the user does not exist in db", async () => {
    const user = test.mocks.user();
    const { status } = await get({
      user,
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    expect(status).toEqual(NOT_FOUND);
  });
  it("Does respond with OK if the user does not exist in db", async () => {
    const user = await users.insert(test.mocks.user());
    const { status } = await get({
      user,
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    expect(status).toEqual(OK);
  });

  it("Gives active subscription if user subscription is active in database", async () => {
    const user = await insertUserWithSubscription("active");
    expect(user.subscription).toEqual("active");
    const { body } = await get({
      user,
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    expect(body.subscription).toEqual("active");
  });

  it("Gives inactive subscription if user subscription is active in database", async () => {
    const user = await insertUserWithSubscription("inactive");

    expect(user.subscription).toEqual("inactive");
    const { body } = await get({
      user,
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    expect(body.subscription).toEqual("inactive");
  });
});
