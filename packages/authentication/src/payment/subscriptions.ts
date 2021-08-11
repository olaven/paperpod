import { logger, models } from "@paperpod/common";
import { setSubscriptionStatus } from "../authdatabase/users";
import { makeStripeFunctions, stripe } from "./stripe";

const { assignUserToSubscriptionMetadata } = makeStripeFunctions(stripe);

export const activateSubscription = async (
  user: models.User,
  subscriptionId: string
) => {
  /**
   * Ties the user id to the Stripe subscription.
   * This allows us to retrieve the user
   * in webhook events, where the Stripe subscription
   * objects are available
   */
  await assignUserToSubscriptionMetadata(user, subscriptionId);
  const updated = await setSubscriptionStatus({
    ...user,
    subscription: "active",
    subscription_id: subscriptionId,
  });

  logger.trace({
    message: "setting subscription id",
    subscriptionId,
    updated,
  });

  return updated;
};

export const deleteSubscription = async (user: models.User) => {
  stripe.subscriptions.del(user.subscription_id);
  const updated = await setSubscriptionStatus({
    ...user,
    subscription: "inactive",
    subscription_id: null,
  });

  return updated;
};
