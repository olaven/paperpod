import { constants, models } from "@paperpod/common";
import express from "express";

export const createFakeUserMiddlewareRunner =
  (
    middleware: (
      handler: (
        request: express.Request,
        response: express.Response,
        user: models.User
      ) => any
    ) => any
  ) =>
  (
    token: {
      bearer?: string;
      cookie?: string;
    },
    handler: (
      request: express.Request,
      response: express.Response,
      user: models.User
    ) => any
  ) =>
    middleware(handler)(
      {
        headers: {
          authorization: `Bearer ${token.bearer}`,
        },
        cookies: {
          [constants.TOKEN_COOKIE_HEADER()]: token.cookie,
        },
      } as any,
      {
        status: (code: number) => ({
          end: () => {},
        }),
      } as any
    );
