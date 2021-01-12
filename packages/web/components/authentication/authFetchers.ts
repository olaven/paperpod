import { models } from "common";
import { del, get, post } from "node-kall";

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
        {
            headers: {
                authorization: "Bearer " + token,
            }
        }
    );

export const getMe = (token: string) =>
    get<models.User>("/authentication/users/me/", {
        headers: {
            authorization: "Bearer " + token,
        },
    })