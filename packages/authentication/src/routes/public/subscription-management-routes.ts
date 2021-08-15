/**
 * Activation of subscription is setup
 * through the checkout session process
 * in `payment-routes.ts`.
 *
 * These routes are for the users' administration
 * of the subscription after it has been
 * created.
 */
import * as express from "express";
import { middleware } from "@paperpod/server";
import { FORBIDDEN, NO_CONTENT } from "node-kall";
import { deleteSubscription } from "../../payment/subscriptions";
import { logger } from "@paperpod/common";
export const subscriptionManagementRoutes = express.Router().delete(
  "/users/:id/subscription",
  middleware.withAuthentication(async (request, response, user) => {
    const { id } = request.params;
    if (user.id !== id) return response.status(FORBIDDEN).send();

    await deleteSubscription(user);

    return response.status(NO_CONTENT).send();
  })
);
