import { constants, logger, models, validators } from "@paperpod/common";
import { jwt, middleware } from "@paperpod/server";
import express from "express";
import * as database from "../../authdatabase/authdatabase";
import {
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  NO_CONTENT,
  OK,
  UNAUTHORIZED,
} from "node-kall";
import { useCallback } from "react";
import { hash } from "../../cryptography/cryptography";

const withTokenCookie = (token: string | null, response: express.Response) =>
  response.cookie(constants.TOKEN_COOKIE_HEADER(), token, {
    // cannot be accessed with JS
    httpOnly: true,
    sameSite: true,
    // must be sent over https
    secure: true,
    // only available for 10 minutes (token invalid after 15 minutes anyways)
    maxAge: 600_000, //i.e. 10 minutes
  });

// NOTE: only exported for tests
export const credentialsAreValid = async ({
  email,
  password,
}: models.UserCredentials) => {
  if (!email || !password) return false;

  const user = await database.users.getByEmail(email.toLowerCase());
  if (!user) return false;

  return await hash.compare(password, user?.password_hash);
};

export const userRoutes = express
  .Router()
  .post("/users/sessions", async (request, response) => {
    const credentials = request.body as models.UserCredentials;
    if (await credentialsAreValid(credentials)) {
      const user = await database.users.getByEmail(
        credentials.email.toLowerCase()
      );
      const token = jwt.sign(user);

      logger.debug({
        message: "Created session for user",
        user,
      });
      return withTokenCookie(token, response).status(CREATED).send({ token });
    } else {
      logger.debug({
        message: "Credentials were invalid",
        credentials,
      });
      return response.status(UNAUTHORIZED).send();
    }
  })
  .delete(
    "/users/sessions",
    middleware.withAuthentication((request, response, user) => {
      //FIXME: somehow permanently invalidate old token
      return withTokenCookie(null, response)
        .status(NO_CONTENT)
        .send({ token: null });
    })
  )
  .put(
    "/users/sessions",
    middleware.withAuthentication(async (request, response, jwtUser) => {
      //make sure new token is signed with updated user.
      const user = await database.users.getById(jwtUser.id);
      const token = jwt.sign(user);
      return withTokenCookie(token, response).status(OK).send({ token });
    })
  )
  .post("/users", async (request, response) => {
    const credentials = request.body as models.UserCredentials;
    if (
      !credentials ||
      !credentials.email ||
      !credentials.password ||
      !validators.validatePassword(credentials.password) ||
      !validators.validateEmail(credentials.email)
    )
      return response.status(BAD_REQUEST).send();

    const existing = await database.users.getByEmail(credentials.email);

    if (existing) return response.status(CONFLICT).send();

    const user = await database.users.insert({
      id: null,
      email: credentials.email.toLowerCase(),
      password_hash: await hash.hash(credentials.password),
      subscription: "inactive",
    });

    const token = jwt.sign(user);

    return withTokenCookie(token, response).status(CREATED).send({ token });
  })
  .get(
    "/users/me",
    middleware.withAuthentication(async (request, response, user) => {
      /**
       * User data may have been
       * updated since the token was
       * created.
       *
       * This currently applies to subscription.
       */
      const updatedUser = await database.users.getById(user.id);
      return response.json({
        ...updatedUser,
        password_hash: undefined,
      });
    })
  );
