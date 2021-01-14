import { models } from "common";
import { del, get, post } from "node-kall";
import { bearer } from "../../helpers/bearer";

export const signup = (credentials: models.UserCredentials) =>
    post<
        models.UserCredentials,
        models.TokenResponse
    >("/authentication/users", credentials);

export const login = (credentials: models.UserCredentials) =>
    post<
        models.UserCredentials,
        models.TokenResponse
    >("/authentication/users/sessions", credentials);

export const logout = (token: string) =>
    del<models.TokenResponse>(
        "/authentication/users/sessions",
        bearer(token),
    );

export const getMe = (token: string) =>
    get<models.User>(
        "/authentication/users/me/", 
        bearer(token)
    ); 