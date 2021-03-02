import redoc from "redoc-express"; 
import * as server from "@paperpod/server";

const app = server.app
    .appWithEnvironment()
    .use((request, response, next) => {
        console.log("Geting here updated", request.url); 
        next(); 
    })
    .get("api", (request ,response) => {

        response.sendFile("openapi.yml", { root: "." })
    })
    .get("/", redoc({
        title: "something", 
        specUrl: "api"
    }));

process.env.PORT = "8088";
server.boot("/docs", app);