import { models } from "@paperpod/common";
import { del, get, post, put } from "node-kall";
import { bearer } from "./bearer";

export const signup = (credentials: models.UserCredentials) =>
  post<models.UserCredentials, models.TokenResponse>(
    "/authentication/users",
    credentials
  );

export const login = (credentials: models.UserCredentials) =>
  post<models.UserCredentials, models.TokenResponse>(
    "/authentication/users/sessions",
    credentials
  );

export const logout = (token: string) =>
  del<models.TokenResponse>("/authentication/users/sessions", bearer(token));

export const getMe = (token: string) =>
  get<models.User>("/authentication/users/me/", bearer(token));

export const refreshToken = (token: string) =>
  put<models.TokenResponse>(
    "/authentication/users/sessions",
    null,
    bearer(token)
  );
