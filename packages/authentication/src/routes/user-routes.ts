import { hash } from "../cryptography/cryptography";
import { nanoid } from "nanoid";
import { models, server } from "common";
import { WithId } from "mongodb";
import express from "express";
import { BAD_REQUEST, CONFLICT, CREATED, FORBIDDEN, NO_CONTENT, OK, UNAUTHORIZED } from "node-kall";
import { getUserByEmail } from "common/src/server/server";
import { withAuthentication } from "common/src/server/middleware/middleware";




const credentialsAreValid = async ({ email, password }: models.UserCredentials) => {

    console.log("in validation with", email, password);

    if (!email || !password) return false;


    console.log("GOING TO USER");
    return server.withDatabase(async database => {

        const user = await server.getUsers(database).findOne({
            email
        });

        console.log("FOUND USER")

        return user && (await hash.compare(password, user.password_hash));
    })
}


export const userRoutes = express.Router()
    .post("/users/sessions", async (request, response) => {

        const credentials = request.body as models.UserCredentials;
        if (await credentialsAreValid(credentials)) {

            const user = await getUserByEmail(credentials.email);
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

        if (!credentials || !credentials.email || !credentials.password)
            return response
                .status(BAD_REQUEST)
                .send();


        await server.withDatabase(async database => {

            const existing = await server.getUserByEmail(credentials.email);
            if (existing) return response
                .status(CONFLICT)
                .send();

            const user: models.User = {
                _id: nanoid(),
                email: credentials.email,
                password_hash: await hash.hash(credentials.password)
            }
            await server.getUsers(database).insertOne(user as any as WithId<models.User>);

            const token = server.jwt.sign(user);
            response
                .status(CREATED)
                .send({ token });
        });
    })
    .get(
        "/users/me",
        withAuthentication((request, response, user) => {

            response.json(user);
        }));
