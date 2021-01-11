import { hash, jwt } from "../cryptography/cryptography";
import { nanoid } from "nanoid";
import { models, server } from "common";
import { WithId } from "mongodb";
import express from "express";
import { BAD_REQUEST, CREATED, FORBIDDEN, OK, UNAUTHORIZED } from "node-kall";
import { getUserByEmail } from "common/src/server/server";
import { sign } from "jsonwebtoken";


const authenticatedWithToken = (handler: (request: express.Request, response: express.Response, user: models.User) => any) =>
    (request: express.Request, response: express.Response) => {

        const getBearerToken = (request: express.Request) =>
            request.headers.authorization.replace("Bearer ", "");

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
    .post("/users/session", async (request, response) => {

        const credentials = request.body as models.UserCredentials;
        if (await credentialsAreValid(credentials)) {

            const user = await getUserByEmail(credentials.email);
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
    .post("/users", async (request, response) => {

        const credentials = request.body as models.UserCredentials;
        console.log("Here are the credentials", credentials);
        if (!credentials || !credentials.email || !credentials.password)
            return response
                .status(BAD_REQUEST)
                .send();

        await server.withDatabase(async database => {

            const user: models.User = {
                _id: nanoid(),
                email: credentials.email,
                password_hash: await hash.hash(credentials.password)
            }
            await server.getUsers(database).insertOne(user as any as WithId<models.User>);

            const token = jwt.sign(user);
            response
                .status(CREATED)
                .send({ token });
        });
    })
    .get(
        "/users/me",
        authenticatedWithToken((request, response, user) => {

            response.json(user);
        }));
