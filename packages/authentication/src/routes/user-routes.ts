import { hash } from "../cryptography/cryptography";
import { nanoid } from "nanoid";
import { models, server } from "common";
import express from "express";
import * as database from "../authdatabase/authdatabase"
import { BAD_REQUEST, CONFLICT, CREATED, NO_CONTENT, UNAUTHORIZED } from "node-kall";
import { withAuthentication } from "common/src/server/middleware/middleware";


const credentialsAreValid = async ({ email, password }: models.UserCredentials) => {

    if (!email || !password) return false;

    const user = await database.users.getByEmail(email);
    const passwordEqual = await hash.compare(password, user?.password_hash);

    return user && passwordEqual;
}


export const userRoutes = express.Router()
    .post("/users/sessions", async (request, response) => {

        const credentials = request.body as models.UserCredentials;
        if (await credentialsAreValid(credentials)) {

            const user = await database.users.getByEmail(credentials.email);
            const token = server.jwt.sign(user);

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
    .delete("/users/sessions", withAuthentication(
        (request, response, user) => {

            //FIXME: somehow invalidate old token 
            response.send(NO_CONTENT).send({
                token: null
            });
        }
    ))
    .post("/users", async (request, response) => {

        const credentials = request.body as models.UserCredentials;
        console.log("I am here with credentials: ", credentials)

        if (!credentials || !credentials.email || !credentials.password)
            return response
                .status(BAD_REQUEST)
                .send();

        const existing = database.users.getByEmail(credentials.email);


        if (existing) return response
            .status(CONFLICT)
            .send();

        const user = await database.users.insert({
            _id: nanoid(),
            email: credentials.email,
            password_hash: await hash.hash(credentials.password)
        });

        const token = server.jwt.sign(user);

        return response
            .status(CREATED)
            .send({ token });
    })
    .get(
        "/users/me",
        withAuthentication((request, response, user) => {

            response.json({
                ...user,
                password_hash: undefined
            });
        }));
