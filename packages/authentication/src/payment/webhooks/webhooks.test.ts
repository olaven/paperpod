import { getWebhookHandler } from "./webhooks";

describe("Webhook type/handler map", () => {
  it("connects customer.subscription.deleted to customer subscription deletion handle", () => {
    const handler = getWebhookHandler("customer.subscription.deleted");
    expect(handler.name).toEqual("customerSubscriptionDeleted");
  });

  //TODO: add tests for future handlers
});
