import { models, server } from "common";
import { nanoid } from "nanoid";
import { WithId } from "mongodb";
import { getUsers, withDatabase } from "common/src/server/server";
import { configurePassport } from "./passport";
import { hash } from "./hash";


server.boot("authentication", app => {

    configurePassport(app);

    app.post("/users", async (request, response) => {

        const credentials = request.body as models.UserCredentials;

        await withDatabase(async database => {

            const user: models.User = {
                _id: nanoid(),
                email: credentials.email,
                password_hash: await hash(credentials.password)
            }
            await getUsers(database).insertOne(user as any as WithId<models.User>);
            response.redirect("/");
        });
    });

    app.get(
        "/users/me",
        (request, response) => {

            if (request.isAuthenticated())
                response.json({
                    ...request.user,
                    password_hash: null,//NOTE: no reason to send this and potential security risk 
                })
            else
                response.status(401)
        })



});