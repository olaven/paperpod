import { hash } from "./hash/hash";
import { nanoid } from "nanoid";
import { models, server } from "common";
import { WithId } from "mongodb";
import express from "express";
import { BAD_REQUEST } from "node-kall";

export const userRoutes = express.Router()
    .post("/users", async (err, request, response, next) => {

        const credentials = request.body as models.UserCredentials;

        if (!credentials || !credentials.email || !credentials.password)
            return response
                .status(BAD_REQUEST)
                .send();

        await server.withDatabase(async database => {

            const user: models.User = {
                _id: nanoid(),
                email: credentials.email,
                password_hash: await hash(credentials.password)
            }
            await server.getUsers(database).insertOne(user as any as WithId<models.User>);
            response.redirect("/");
        });
    })
    .get(
        "/users/me",
        (request, response) => {

            if (request.isAuthenticated())
                response.json({
                    ...request.user,
                    password_hash: null,//NOTE: no reason to send this and potential security risk 
                })
            else
                response.status(401)
        });
