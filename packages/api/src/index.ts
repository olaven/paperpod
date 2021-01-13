import { CREATED, OK } from "node-kall";;
import { server } from "common";


const app = server.app.appWithEnvironment()
    .post("/articles", (request, response) => {

        response.status(CREATED).send("Created");
    })


    .get("/articles", server.middleware.withAuthentication((request, response, user) => {

    }));

server.boot("/api", app);