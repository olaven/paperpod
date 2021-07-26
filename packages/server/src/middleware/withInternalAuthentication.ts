import * as express from "express";
import { UNAUTHORIZED, FORBIDDEN } from "node-kall";
import { logger } from "@paperpod/common";

//NOTE: exported only for tests
export const getBasicAuth = (request: express.Request) => {
  const { authorization } = request.headers;
  const value = authorization ? authorization.replace("Basic ", "") : null;
  if (value === null) return null;

  const splitIndex = value.indexOf(":");
  const username = value.substring(0, splitIndex);
  const password = value.substring(splitIndex + 1);

  logger.debug({
    message: "internal auth middleware",
    username,
    password,
    auth: request.headers.authorization,
  });

  return { username, password };
};

/**
 * Is the callee calling
 * from another Paperpod
 * service?
 * @param handler
 * @returns
 */
export const withInternalAuthentication =
  (handler: (request: express.Request, response: express.Response) => void) =>
  (request: express.Request, response: express.Response) => {
    const credentials = getBasicAuth(request);
    if (!credentials) {
      return response.status(UNAUTHORIZED).end();
    }

    if (
      credentials.username !== process.env.ADMIN_USERNAME ||
      credentials.password !== process.env.ADMIN_PASSWORD
    ) {
      return response.status(FORBIDDEN).end();
    }

    return handler(request, response);
  };
