import supertest from "supertest";
import { NOT_IMPLEMENTED, NO_CONTENT, FORBIDDEN } from "node-kall";
import { models, test } from "@paperpod/common";
import { jwt } from "@paperpod/server";

import { users } from "../../authdatabase/authdatabase";
import { publicAuthenticationApp } from "../../app";
import { setupMigrations } from "../../test-utils/test-utils";

jest.mock("../../payment/stripe", () => {
  return {
    makeStripeFunctions: () => ({
      deleteSubscription: async () => "DONE WITH MOCK STRIP DELETE",
    }),
  };
});

describe("Endpoints for user management of subscription", () => {
  setupMigrations();
  describe("Endpoint for ending a subscription", () => {
    const deleteSubscription = (user: models.User, as = user) => {
      const token = jwt.sign(as);
      return supertest(publicAuthenticationApp)
        .delete(`/users/${user.id}/subscription`)
        .set("Authorization", "Bearer " + token);
    };

    const insertSubscribingUser = async (
      overrides: Partial<models.User> = {}
    ) => {
      const user = await users.insert({
        ...test.mocks.user(),
        ...overrides,
      });

      return users.setSubscriptionStatus({
        ...user,
        subscription: "active",
      });
    };

    it("Does not respond with NOT_IMPLEMENTED", async () => {
      const user = await insertSubscribingUser();
      const { status } = await deleteSubscription(user);
      expect(status).not.toEqual(NOT_IMPLEMENTED);
    });

    it("Does respond with NO_CONTENT on successful request", async () => {
      const user = await insertSubscribingUser();
      const { status } = await deleteSubscription(user);
      expect(status).toEqual(NO_CONTENT);
    });

    it("Does set subscription status to 'inactive' on successful request", async () => {
      const user = await insertSubscribingUser();
      const original = await users.getById(user.id);

      const { status } = await deleteSubscription(user);
      expect(status).toEqual(NO_CONTENT);

      const updated = await users.getById(user.id);

      expect(original.subscription).toEqual("active");
      expect(updated.subscription).toEqual("inactive");
    });

    it("Does respond with FORBIDDEN if the requesting user is an impostor", async () => {
      const firstUser = await insertSubscribingUser();
      const secondUser = await insertSubscribingUser();

      const { status } = await deleteSubscription(firstUser, secondUser);
      expect(status).toEqual(FORBIDDEN);
    });

    it("Does not set subscription status to 'inactive' on FORBIDDEN request", async () => {
      const actualUser = await insertSubscribingUser();
      const impostor = await insertSubscribingUser();

      const original = await users.getById(actualUser.id);

      const { status } = await deleteSubscription(actualUser, impostor);
      expect(status).toEqual(FORBIDDEN);

      const updated = await users.getById(actualUser.id);

      expect(original.subscription).toEqual("active");
      expect(original.subscription).toEqual(updated.subscription);
    });
  });
});
