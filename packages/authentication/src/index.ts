import { models, server } from "common";
import { nanoid } from "nanoid";
import { ObjectID } from "mongodb";
import { BAD_REQUEST, CREATED, NOT_FOUND } from "node-kall";
import bcrypt from "bcrypt";

server.boot("authentication", authentication => {

    //FIXME: authorization 
    authentication.get("/users/:id", async (request, response) => {

        const _id = request.params.id;
        await server.withDatabase(async database => {

            const user = await server
                .getUsers(database)
                .findOne({ _id });

            if (user) response.json(user);
            else response.status(NOT_FOUND).send();
        });
    });


    authentication.post("/users", async (request, response) => {

        const credentials = request.body as models.UserCredentials;
        if (!credentials || !credentials.email || !credentials.password) response.status(BAD_REQUEST).send("BAD USER");

        await server.withDatabase(async database => {

            const user = {
                email: credentials.email,
                password_hash: bcrypt.hashSync(credentials.password, 10),
                _id: nanoid() as any as ObjectID
            };

            await server
                .getUsers(database)
                .insertOne(user);

            response
                .status(CREATED)
                .send(user);
        });

    });
});