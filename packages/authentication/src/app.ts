import { server } from "common";
import { userRoutes } from "./routes/routes";

export const app =
    server.app.appWithEnvironment(
        server.app.appWithBodyParser()
    )
        .use("", userRoutes)
        .use((request, response, next) => {

            console.log("In middleware, with a request pointing to", request.url)
            next()
        });
