import express from "express";
import { Stripe } from "stripe";
import { CREATED } from "node-kall";
import { withAuthentication } from "../../../server/src/middleware/withAuthentication";
import { models } from "@paperpod/common";
import { makeCheckoutFunctions } from "../payment/checkout";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  //null, i.e. account default version
  apiVersion: null,
});

const { createPaymentSession: createPaymentSession } =
  makeCheckoutFunctions(stripe);

export const paymentRoutes = express
  .Router()
  //https://stripe.com/docs/billing/subscriptions/checkout
  .post(
    "/checkout-session",
    withAuthentication(async (request, response) => {
      const session = await createPaymentSession();

      return response.status(CREATED).send(<models.CheckoutSessionResponse>{
        sessionId: session.id,
      });
    })
  );
