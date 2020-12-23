import { server } from "common";
import { NOT_FOUND } from "node-kall";


server.boot("authentication", authentication => {

    authentication.get("/:id", async (request, response) => {

        const id = request.params.id;
        await server.withDatabase(async database => {

            const user = await server.getUsers(database).findOne({ id })

            if (user) response.json(user);
            else response.status(NOT_FOUND).send();
        });
    });


    authentication.post("/", (request, response) => {

        response.send("HEllo, authentication!");
    });
});