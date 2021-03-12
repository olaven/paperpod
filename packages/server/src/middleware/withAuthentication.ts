import express from "express";
import { models } from "@paperpod/common";
import { UNAUTHORIZED, FORBIDDEN } from "node-kall";
import * as jwt from "../jwt/jwt";

const getBearerToken = (request: express.Request) =>
  request.headers.authorization?.replace("Bearer ", "");

export const withAuthentication = (
  handler: (
    request: express.Request,
    response: express.Response,
    user: models.User
  ) => any
) => (request: express.Request, response: express.Response) => {
  const token = getBearerToken(request);

  if (!token || token === "null") return response.status(UNAUTHORIZED).end();

  try {
    const user = jwt.decode<models.User>(token);

    if (!user) return response.status(FORBIDDEN).end();

    //TODO: some user data validation. Does it look like a user?

    handler(request, response, user);
  } catch (error) {
    //i.e. malformed token
    return response.status(FORBIDDEN).end();
  }
};
