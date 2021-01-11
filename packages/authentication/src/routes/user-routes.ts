import { hash, jwt } from "../cryptography/cryptography";
import { nanoid } from "nanoid";
import { models, server } from "common";
import { WithId } from "mongodb";
import express from "express";
import { BAD_REQUEST, FORBIDDEN, UNAUTHORIZED } from "node-kall";

const getBearerToken = (request: express.Request) =>
    request.headers.authorization
        ?.split("Bearer ")[0]

const authenticatedWithToken = (handler: (request: express.Request, response: express.Response, user: models.User) => any) =>
    (request: express.Request, response: express.Response) => {

        const token = getBearerToken(request);

        if (!token) return response
            .status(UNAUTHORIZED)
            .end();

        console.log("TOKEN:", token);

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

export const userRoutes = express.Router()
    .get("/test", authenticatedWithToken((request, response, user) => {

        console.log("Got user: ", user);
        response.send(user);
    }))
    .get("/token", (request, response) => {

        response.send(jwt.sign<models.User>({
            email: "olav@sundfoer.com",
            _id: "en eller annen brukerid"
        }));
    })
    .post("/users", async (request, response) => {

        const credentials = request.body as models.UserCredentials;
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
