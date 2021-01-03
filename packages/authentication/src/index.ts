import { server } from "common";
import nanoid from "nanoid";
import { NOT_FOUND } from "node-kall";

server.boot("authentication", authentication => {

    authentication.get("/users/:id", async (request, response) => {

        const id = request.params.id;
        await server.withDatabase(async database => {

            const user = await server.getUsers(database).findOne({ id })

            if (user) response.json(user);
            else response.status(NOT_FOUND).send();
        });
    });


    authentication.post("/users", async (request, response) => {

        await server.withDatabase(async database => {

            server.getUsers(database).insertOne({
                id: nanoid.nanoid(),
                email: "test@example.com",
                password_hash: "hash of entered password."
            })
        });
    });
});