import { server } from "common";
import { withPassportConfiguration } from "./passport";
import { userRoutes } from "./user-routes";

export const app =
    withPassportConfiguration(
        server.appWithEnvironment()
    )
        .use("", userRoutes)
        .use((req, res, next) => {

            console.log("midleware - ", req.path);
            next();
        });
