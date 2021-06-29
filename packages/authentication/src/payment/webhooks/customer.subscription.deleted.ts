import Stripe from "stripe";
import { users } from "../../authdatabase/authdatabase";

export const customerSubscriptionDeleted = async (event: Stripe.Event) => {
  //guaranteed to be Stripe.Subscription type when subscription event - https://stripe.com/docs/api/events/types
  const subscription = event.data.object as Stripe.Subscription;
  const { userId } = subscription.metadata;
  const user = await users.getById(userId);

  users.setSubscriptionStatus({
    ...user,
    subscription: "inactive",
  });
  //FIXME: send an email
};
