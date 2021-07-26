import * as express from "express";
import { OK, BAD_REQUEST, NOT_FOUND } from "node-kall";
import { middleware } from "@paperpod/server";
import { users } from "../../authdatabase/authdatabase";
import { models } from "@paperpod/common";

export const subscriptionStatusRoute = express.Router().get(
  "/users/:id/subscription",
  middleware.withInternalAuth(async (request, response) => {
    const id = request.params.id;
    if (!id) {
      return response.status(BAD_REQUEST).end();
    }

    const user = await users.getById(id);
    if (user === null) {
      return response.status(NOT_FOUND).end();
    }

    return response.status(OK).send({
      subscription: user.subscription,
    } as models.UserSubscriptionStatusResponse);
  })
);
