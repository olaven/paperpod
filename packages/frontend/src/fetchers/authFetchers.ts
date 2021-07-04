import { models, constants } from "@paperpod/common";
import { del, get, post, put } from "node-kall";
import { bearer } from "./bearer";

export const signup = (credentials: models.UserCredentials) =>
  post<models.UserCredentials, models.TokenResponse>(
    `${constants.APPLICATION_URL()}/authentication/users`,
    credentials
  );

export const login = (credentials: models.UserCredentials) =>
  post<models.UserCredentials, models.TokenResponse>(
    `${constants.APPLICATION_URL()}/authentication/users/sessions`,
    credentials
  );

export const logout = (token: string) =>
  del<models.TokenResponse>(
    `${constants.APPLICATION_URL()}/authentication/users/sessions`,
    bearer(token)
  );

export const getMe = (token: string) =>
  get<models.User>(
    `${constants.APPLICATION_URL()}/authentication/users/me/`,
    bearer(token)
  );

export const refreshToken = (token: string) =>
  put<models.TokenResponse>(
    `${constants.APPLICATION_URL()}/authentication/users/sessions`,
    null,
    bearer(token)
  );
