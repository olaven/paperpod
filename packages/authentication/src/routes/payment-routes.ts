import express from "express";
import { NOT_IMPLEMENTED } from "node-kall";

export const paymentRoutes = express
  .Router()
  //https://stripe.com/docs/billing/subscriptions/checkout
  .post("/checkout-session", (request, response) => {
    return response.status(NOT_IMPLEMENTED);
  });
