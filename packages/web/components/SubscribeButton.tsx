import * as React from "react";
import { Button } from "@paperpod/ui";
import { fetchers, FrontendContext } from "@paperpod/frontend";
import { loadStripe } from "@stripe/stripe-js";

import { CREATED } from "node-kall";

import { logger, models } from "@paperpod/common";
import { UserContext } from "@paperpod/frontend/src/authentication/UserContext";
export const SubscribeButton = () => {
  const { serverHostname } = React.useContext(FrontendContext);
  const { token } = React.useContext(UserContext);
  const subscribe = async () => {
    const [status, body] = await fetchers.payment.postPaymentSession(
      await token(),
      serverHostname
    );

    if (status !== CREATED) {
      logger.error(`Error creating payment session: ${status}`);
      throw `${status} when creating payment session. Expected ${CREATED}`;
    }

    const { sessionId } = body as models.CheckoutSessionResponse;
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );

    logger.debug(`got session id: ${sessionId}`);
    stripe.redirectToCheckout({
      sessionId: sessionId,
    });
  };
  return (
    <>
      <Button onClick={subscribe}>Subscribe</Button>
    </>
  );
};
