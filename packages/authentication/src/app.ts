import { server } from "common";
import { withPassportConfiguration } from "./passport";
import { userRoutes } from "./routes/routes";

export const app =
    withPassportConfiguration(
        server.appWithEnvironment()
    )
        .use("", userRoutes)
        .use((request, response, next) => {

            console.log("In middleware, with a request pointing to", request.url)
            next()
        });
