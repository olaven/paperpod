import { models } from "@paperpod/common";
import { del, get, post, put } from "node-kall";
import { bearer } from "./bearer";

type FetcherOptions = {
  serverHostname: string;
};

export const signup = (
  credentials: models.UserCredentials,
  options: FetcherOptions
) =>
  post<models.UserCredentials, models.TokenResponse>(
    `${options.serverHostname}/authentication/users`,
    credentials
  );

export const login = (
  credentials: models.UserCredentials,
  options: FetcherOptions
) =>
  post<models.UserCredentials, models.TokenResponse>(
    `${options.serverHostname}/authentication/users/sessions`,
    credentials
  );

export const logout = (token: string, options: FetcherOptions) =>
  del<models.TokenResponse>(
    `${options.serverHostname}/authentication/users/sessions`,
    bearer(token)
  );

export const getMe = (token: string, options: FetcherOptions) =>
  get<models.User>(
    `${options.serverHostname}/authentication/users/me/`,
    bearer(token)
  );

export const refreshToken = (token: string, options: FetcherOptions) =>
  put<models.TokenResponse>(
    `${options.serverHostname}/authentication/users/sessions`,
    null,
    bearer(token)
  );
