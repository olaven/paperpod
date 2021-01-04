import { CREATED, OK } from "node-kall";;
import { server } from "common";


server.boot("api", (api) => {

    api.post("/articles", (request, response) => {

        response.status(CREATED).send("Created");
    });


    api.get("/articles", (request, response) => {

        response.status(OK).send("Retrieved");
    });
});