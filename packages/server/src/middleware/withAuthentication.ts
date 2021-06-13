import express from "express";
import { logger, models } from "@paperpod/common";
import { UNAUTHORIZED, FORBIDDEN } from "node-kall";
import * as jwt from "../jwt/jwt";

//NOTE: only exported for tests
export const getBearerToken = (request: express.Request) => {
  const { authorization } = request.headers;
  return authorization ? authorization.replace("Bearer ", "") : null;
};

export const withAuthentication =
  (
    handler: (
      request: express.Request,
      response: express.Response,
      user: models.User
    ) => any
  ) =>
  (request: express.Request, response: express.Response) => {
    const token = getBearerToken(request);

    if (!token || token === "null") return response.status(UNAUTHORIZED).end();

    try {
      const user = jwt.decode<models.User>(token);

      //NOTE: basic user validation
      if (!user || !user.id || !user.email || !user.password_hash)
        return response.status(FORBIDDEN).end();

      handler(request, response, user);
    } catch (error) {
      //i.e. malformed token
      return response.status(FORBIDDEN).end();
    }
  };
