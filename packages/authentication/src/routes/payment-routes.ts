import express from "express";
import { Stripe } from "stripe";
import { CREATED, FORBIDDEN, NOT_FOUND, BAD_REQUEST } from "node-kall";
import { withAuthentication } from "../../../server/src/middleware/withAuthentication";
import { logger, models } from "@paperpod/common";
import { makeCheckoutFunctions } from "../payment/checkout";
import { users } from "../authdatabase/authdatabase";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  //null, i.e. account default version
  apiVersion: null,
});

const { createPaymentSession, getSession } = makeCheckoutFunctions(stripe);

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

    const user = users.getById(userId);
    if (!user) return response.status(FORBIDDEN).send();

    //TODO: update the user status
    response.send("This should redirect to home page");
  })
  .get("/payment/cancelled", async (request, response) => {});
