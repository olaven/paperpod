import Stripe from "stripe";
import { models } from "../../../../common/src";
import { customerSubscriptionDeleted } from "./customer.subscription.deleted";

// possible events: https://stripe.com/docs/api/events/types
export type StripeEventType = "customer.subscription.deleted";

export const getWebhookHandler = (type: StripeEventType) => {
  const handlers: {
    [key in StripeEventType]: (event: Stripe.Event) => Promise<void>;
  } = {
    "customer.subscription.deleted": customerSubscriptionDeleted,
  };

  return handlers[type];
};
