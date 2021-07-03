import express from "express";
import { Stripe } from "stripe";
import {
  CREATED,
  NO_CONTENT,
  FORBIDDEN,
  NOT_FOUND,
  BAD_REQUEST,
} from "node-kall";
import { withAuthentication } from "../../../server/src/middleware/withAuthentication";
import { constants, logger, models } from "@paperpod/common";
import { makeStripeFunctions, stripe } from "../payment/stripe";
import { users } from "../authdatabase/authdatabase";
import {
  getWebhookHandler,
  StripeEventType,
} from "../payment/webhooks/webhooks";

const { createPaymentSession, getSession, assignUserToSubscriptionMetadata } =
  makeStripeFunctions(stripe);

export const paymentRoutes = express
  .Router()
  //https://stripe.com/docs/billing/subscriptions/checkout
  .post(
    "/checkout-session",
    withAuthentication(async (request, response, user) => {
      const session = await createPaymentSession(user);

      return response.status(CREATED).send(<models.CheckoutSessionResponse>{
        sessionId: session.id,
      });
    })
  )
  .get("/payment/success", async (request, response) => {
    const sessionId = request.query.session_id as string;
    logger.debug(`Succeeded with session id: ${sessionId}`);

    const session = await getSession(sessionId);
    if (!session)
      return response
        .status(NOT_FOUND)
        .send("Could not find this payment session.");

    const { client_reference_id: userId } = session;
    if (!userId)
      return response.status(BAD_REQUEST).send("Missing client reference");

    const user = await users.getById(userId);
    if (!user) return response.status(FORBIDDEN).send();

    /**
     * Ties the user id to the Stripe subscription.
     * This allows us to retrieve the user
     * in webhook events, where the Stripe subscription
     * objects are available
     */
    await assignUserToSubscriptionMetadata(
      user,
      session.subscription as string
    );
    await users.setSubscriptionStatus({
      ...user,
      subscription: "active",
    });

    response.redirect(constants.APPLICATION_URL());
  })
  .get("/payment/cancelled", async (request, response) => {
    response.redirect(constants.APPLICATION_URL());
  })
  .post("/payment/webhook", async (request, response) => {
    logger.debug("hit webhook endpoint");

    const event = request.body as Stripe.Event;
    logger.trace({
      message: "Got Webhook event",
      event,
    });

    const handler = getWebhookHandler(event.type as StripeEventType);

    if (!handler)
      return response
        .status(BAD_REQUEST)
        .send(`Webhook event ${event.type} not handled.`);

    await handler(event);

    return response.status(NO_CONTENT);
  });
