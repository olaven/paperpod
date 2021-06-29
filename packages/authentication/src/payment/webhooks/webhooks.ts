import Stripe from "stripe";
import { customerSubscriptionCreated } from "./customer.subscription.created";
import { customerSubscriptionDeleted } from "./customer.subscription.deleted";

// possible events: https://stripe.com/docs/api/events/types
export type StripeEventType =
  | "customer.subscription.deleted"
  | "customer.subscription.created";

export const getWebhookHandler = (type: StripeEventType) => {
  const handlers: {
    [key in StripeEventType]: (event: Stripe.Event) => Promise<void>;
  } = {
    "customer.subscription.deleted": customerSubscriptionDeleted,
    "customer.subscription.created": customerSubscriptionCreated,
  };

  return handlers[type];
};
