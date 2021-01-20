import { server } from "@paperpod/common";
import { articleRoutes, fileRoutes, rssRoutes } from "./routes/routes";


export const app = server.app.appWithBodyParser(
    server.app.appWithEnvironment()
)
    .use(rssRoutes)
    .use(articleRoutes)
    .use(fileRoutes)
