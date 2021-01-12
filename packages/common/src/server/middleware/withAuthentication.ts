import express from "express";
import { UNAUTHORIZED, FORBIDDEN, BAD_REQUEST } from "node-kall";
import * as jwt from "../jwt/jwt";
import { models } from "../..";

const getBearerToken = (request: express.Request) =>
    request.headers.authorization.replace("Bearer ", "");

export const withAuthentication = (handler: (request: express.Request, response: express.Response, user: models.User) => any) =>
    (request: express.Request, response: express.Response) => {


        const token = getBearerToken(request);

        if (!token) return response
            .status(UNAUTHORIZED)
            .end();

        try {

            const user = jwt.decode<models.User>(token);

            if (!user) return response
                .status(FORBIDDEN)
                .end();

            handler(request, response, user);
        } catch {

            //i.e. malformed token 
            return response
                .send(BAD_REQUEST);
        }
    }