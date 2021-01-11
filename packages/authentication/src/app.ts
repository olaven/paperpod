import { server } from "common";
import { withPassportConfiguration } from "./passport";
import { userRoutes, jwtRoutes } from "./routes/routes";

export const app =
    withPassportConfiguration(
        server.appWithEnvironment()
    )
        .get("/test", (req, res) => res.send("hello"))
        .use("", userRoutes)
        .use("/jwt", jwtRoutes)
        .use((request, response, next) => {

            console.log("In middleware, with a request pointing to", request.url)
            next()
        });
