import { models, validators } from "@paperpod/common";
import { jwt, middleware } from "@paperpod/server";
import { hash } from "../cryptography/cryptography";
import { nanoid } from "nanoid";
import express from "express";
import * as database from "../authdatabase/authdatabase"
import { BAD_REQUEST, CONFLICT, CREATED, NO_CONTENT, OK, UNAUTHORIZED } from "node-kall";


const credentialsAreValid = async ({ email, password }: models.UserCredentials) => {

    if (!email || !password) return false;

    const user = await database.users.getByEmail(email.toLowerCase());
    const passwordEqual = await hash.compare(password, user?.password_hash);

    return user && passwordEqual;
}


export const userRoutes = express.Router()
    .post("/users/sessions", async (request, response) => {

        const credentials = request.body as models.UserCredentials;
        console.log(`
            Got credentials: 
            ${credentials.email}
            ${credentials.password}
        `)
        if (await credentialsAreValid(credentials)) {


            const user = await database.users.getByEmail(credentials.email.toLowerCase());
            const token = jwt.sign(user);

            return response
                .status(CREATED)
                .send({
                    token
                });
        } else {

            return response
                .status(UNAUTHORIZED)
                .send()
        }
    })
    .delete("/users/sessions", middleware.withAuthentication(
        (request, response, user) => {

            //FIXME: somehow invalidate old token 
            response
                .status(NO_CONTENT)
                .send({
                    token: null
                });
        }
    ))
    .put("/users/sessions", middleware.withAuthentication(
        async (request, response, user) => {

            const token = jwt.sign(user);
            console.log(`token: ${token}`);
            response
                .status(OK)
                .send({
                    token
                });
        }
    ))
    .post("/users", async (request, response) => {

        const credentials = request.body as models.UserCredentials;
        console.log("Attempting to sign up", credentials);

        if (!credentials || !credentials.email || !credentials.password || !validators.validatePassword(credentials.password))
            return response
                .status(BAD_REQUEST)
                .send();

        const existing = await database.users.getByEmail(credentials.email);

        if (existing) return response
            .status(CONFLICT)
            .send();

        const user = await database.users.insert({
            _id: nanoid(),
            email: credentials.email.toLowerCase(),
            password_hash: await hash.hash(credentials.password)
        });

        const token = jwt.sign(user);

        return response
            .status(CREATED)
            .send({ token });
    })
    .get(
        "/users/me",
        middleware.withAuthentication((request, response, user) => {

            response.json({
                ...user,
                password_hash: undefined
            });
        }));
