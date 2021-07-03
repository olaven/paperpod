import { test } from "@paperpod/common";
import faker from "faker";
import {
  insert,
  getByEmail,
  deleteUser,
  getById,
  setSubscriptionStatus,
} from "./users";

describe("The database interface for users", () => {
  describe("authentication.users.subscription-column", () => {
    it("Does exist", async () => {
      const user = await insert(test.mocks.user());
      expect(user.subscription).toBeDefined();
    });

    it("Is 'inactive' by default", async () => {
      const user = await insert(test.mocks.user());
      expect(user.subscription).toEqual("inactive");
    });

    it("can be updated to 'active'", async () => {
      const original = await insert(test.mocks.user());
      const updated = await setSubscriptionStatus({
        ...original,
        subscription: "active",
      });

      expect(original.subscription).not.toEqual(updated.subscription);
      expect(updated.subscription).toEqual("active");
    });

    it("can be updated to 'active'", async () => {
      const original = await insert(test.mocks.user());
      const active = await setSubscriptionStatus({
        ...original,
        subscription: "active",
      });

      const inactive = await setSubscriptionStatus({
        ...active,
        subscription: "inactive",
      });

      expect(active.subscription).not.toEqual(inactive.subscription);
      expect(inactive.subscription).toEqual("inactive");
    });

    it("throws if set to something not 'active' or 'inactive'", async () => {
      const original = await insert(test.mocks.user());
      expect(
        setSubscriptionStatus({
          ...original,
          //passing something not active or inactive should be caught by the compiler
          //@ts-expect-error
          subscription: faker.lorem.word(),
        })
      ).rejects.toThrow();
    });
  });

  describe("Persisting users", () => {
    it("Is possible to persist without throwing", () => {
      expect(insert(test.mocks.user())).resolves.not.toThrow();
    });

    it("Is possible to retrieve the user after persisting", async () => {
      const persisted = await insert(test.mocks.user());
      const retrieved = await getByEmail(persisted.email);

      expect(retrieved).toBeDefined();
      expect(persisted).toEqual(retrieved);
    });
  });

  describe("Retrieving users by email", () => {
    it("Does return a user with the same email", async () => {
      const persisted = await insert(test.mocks.user());
      const retrieved = await getByEmail(persisted.email);

      expect(retrieved.email).toEqual(persisted.email);
    });

    it("Does not return other users, even though they are present", async () => {
      const first = await insert(test.mocks.user());
      const second = await insert(test.mocks.user());

      expect(first).not.toEqual(second);

      const retrieved = await getByEmail(first.email);
      expect(retrieved).toEqual(first);
      expect(retrieved).not.toEqual(second);
    });
  });

  describe("Retrieveing users by id", () => {
    it("Does return a user with the same id ", async () => {
      const persisted = await insert(test.mocks.user());
      const retrieved = await getById(persisted.id);

      expect(retrieved.id).toEqual(persisted.id);
    });

    it("Does not return other users, even though they are present", async () => {
      const first = await insert(test.mocks.user());
      const second = await insert(test.mocks.user());

      expect(first).not.toEqual(second);

      const retrieved = await getById(first.id);
      expect(retrieved).toEqual(first);
      expect(retrieved).not.toEqual(second);
    });
  });

  describe("Deleting users", () => {
    it("Is possible to delete a user", async () => {
      const user = await insert(test.mocks.user());

      const before = await getByEmail(user.email);
      await deleteUser(user.id);
      const after = await getByEmail(user.email);

      expect(before).toEqual(user);
      expect(after).toBeNull();
    });
  });
});
