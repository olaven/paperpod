import { CREATED, OK } from "node-kall";;
import { server } from "common";


server.boot("api", (api) => {

    api.post("/articles", (request, response) => {

        response.status(CREATED).send("Created");
    });


    api.get("/articles", (request, response) => {

        console.log(process.env)
        const url = () => `mongdb:${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}//${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`
        console.log(url())
        /* server.withDatabase(async database => {
            console.log("Hey")
            console.log(database.getMaxListeners())
        }); */
        response.status(OK).send("Retrieved");
    });
});