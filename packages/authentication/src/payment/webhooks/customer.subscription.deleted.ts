import Stripe from "stripe";
import { logger } from "@paperpod/common";
import { users } from "../../authdatabase/authdatabase";

export const customerSubscriptionDeleted = async (event: Stripe.Event) => {
  //guaranteed to be Stripe.Subscription type when subscription event - https://stripe.com/docs/api/events/types
  const subscription = event.data.object as Stripe.Subscription;
  const { userId } = subscription.metadata;

  const user = await users.getById(userId);

  if (!user) {
    const message = `${userId} does not exist.`;
    logger.error({
      handler: "customer.subscription.deleted",
      userId,
      event,
      message,
    });
    throw message;
  } else {
    await users.setSubscriptionStatus({
      ...user,
      subscription: "inactive",
    });

    //FIXME: send an email
  }
};
