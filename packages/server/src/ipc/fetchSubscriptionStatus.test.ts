import { UserSubscriptionStatusResponse } from "@paperpod/common/src/models/UserSubscriptionStatusResponse";
import { hasValidSubscription } from "./fetchSubscriptionStatus";

jest.mock("node-kall", () => {
  return {
    ...(jest.requireActual("node-kall") as object),
    get: async (path: string) => [200, { subscription: "active" }],
  };
});

describe("Fetching subscription status through IPC", () => {
  it("Returns true if endpoint returns active subscription", async () => {
    const active = await hasValidSubscription("some id");
    expect(active).toBe(true);
  });
});
