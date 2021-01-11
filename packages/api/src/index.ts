import { CREATED, OK } from "node-kall";;
import { server } from "common";
import { appWithEnvironment } from "common/src/server/appWithEnvironment";


const app = appWithEnvironment()
    .post("/articles", (request, response) => {

        response.status(CREATED).send("Created");
    })


    .get("/articles", (request, response) => {

        response.status(OK).send("Retrieved");
    });

server.boot("/api", app);