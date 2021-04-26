import path from "path";
import redoc from "redoc-express"; 
import * as server from "@paperpod/server";

const app = server.app
    .appWithEnvironment()
    .get("/openapi.yml", (request ,response) => {

        response.sendFile(path.resolve("src", "openapi.yml"))
    })
    .get("/", redoc({
        title: "Documentation - Paperpod", 
        specUrl: "docs/openapi.yml" // as this gets called from outside the docker container, `/docs`-prefix is nececary 
    }));

server.boot("/docs", app);