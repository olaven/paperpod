import * as server from "@paperpod/server";
import { userRoutes } from "./routes/routes";

export const app =
    server.app.appWithEnvironment(
        server.app.appWithBodyParser()
    )
        .use("", userRoutes);
