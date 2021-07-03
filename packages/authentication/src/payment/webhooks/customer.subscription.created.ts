import Stripe from "stripe";
import { logger } from "../../../../common/src";
import { users } from "../../authdatabase/authdatabase";
import { makeStripeFunctions, stripe } from "../stripe";

export const _customerSubscriptionCreated =
  (stripe: Stripe) => async (event: Stripe.Event) => {
    const subscription = event.data.object as Stripe.Subscription;

    const customer = await makeStripeFunctions(stripe).getCustomer(
      subscription.customer as string
    );

    logger.info({
      message: "User just subscribed!",
      email: customer.email,
    });

    //TODO: send an email here or something
  };

/**
 * NOTE: cannot rely on subscription.metadata.userId here.
 *
 * Metadata gets set in `/payment/success`.
 * The "customer.subscription.created"-webhook event
 * (this event) is triggered just before `/payment/success`.
 *
 * It is reasonable to assume that the email associated
 * with the stripe subscription is the same as the one
 * associated with the Paperpod account.
 *
 * However this may not always be the case.
 */
export const customerSubscriptionCreated = _customerSubscriptionCreated(stripe);
