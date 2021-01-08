import { server } from "common";
import { appWithEnvironment } from "common/src/server/appWithEnvironment";
import { withPassportConfiguration } from "./passport";
import { userRoutes } from "./user-routes";


export const app =
    withPassportConfiguration(
        appWithEnvironment()
    ).use(userRoutes);

server.boot("authentication", app);