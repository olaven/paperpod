import express from "express";
import { constants, logger, models } from "@paperpod/common";
import { UNAUTHORIZED, FORBIDDEN } from "node-kall";
import * as jwt from "../jwt/jwt";

//NOTE: only exported for tests
export const getBearerToken = (request: express.Request) => {
  const { authorization } = request.headers;
  return authorization ? authorization.replace("Bearer ", "") : null;
};

//NOTE: only exported for tests
export const getToken = (request: express.Request): string | null => {
  const consideredDefined = (token: string) =>
    token && token !== "null" && token !== "undefined";

  const bearerToken = getBearerToken(request);
  const cookieToken =
    request.cookies &&
    (request.cookies[constants.TOKEN_COOKIE_HEADER()] as string);

  logger.debug({
    message: "got tokens",
    bearerToken,
    cookieToken,
  });

  // this is the primary way of providing a token, from client memory
  if (consideredDefined(bearerToken)) return bearerToken;

  // the user may have a token as cookie from visiting the website recently
  if (consideredDefined(cookieToken)) return cookieToken;

  return null;
};

export const withAuthentication =
  (
    handler: <T>(
      request: express.Request,
      response: express.Response,
      user: models.User
    ) => Promise<T> | T
  ) =>
  (request: express.Request, response: express.Response) => {
    const token = getToken(request);
    if (token === null) return response.status(UNAUTHORIZED).end();

    try {
      const user = jwt.decode<models.User>(token);

      //NOTE: basic user validation
      if (!user || !user.id || !user.email || !user.password_hash)
        return response.status(FORBIDDEN).end();

      handler(request, response, user);
    } catch (error) {
      //i.e. malformed token
      logger.error({
        error,
        message: `error in withAuthentication`,
      });
      return response.status(FORBIDDEN).end();
    }
  };
