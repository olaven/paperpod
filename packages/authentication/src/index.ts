import { server } from "common";
import { nanoid } from "nanoid";
import { BAD_REQUEST, CREATED, NOT_FOUND } from "node-kall";

server.boot("authentication", authentication => {


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

        const user = request.body;
        if (!user) response.status(BAD_REQUEST).send("BAD USER");

        await server.withDatabase(async database => {

            const withId = {
                ...user,
                _id: nanoid()
            };

            await server
                .getUsers(database)
                .insertOne(withId);

            response
                .status(CREATED)
                .send(withId);
        });

    });
});