import express from "express";
import { models } from "@paperpod/common";
import { FORBIDDEN } from "node-kall";
import { withAuthentication } from "./withAuthentication";

export const withActiveSubscription = (
  handler: (
    request: express.Request,
    response: express.Response,
    user: models.User
  ) => any
) =>
  withAuthentication(async (request, response, user) => {
    if (user.subscription === "active") {
      return await handler(request, response, user);
    } else {
      return response.status(FORBIDDEN).end();
    }
  });
