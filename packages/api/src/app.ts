import * as server from "@paperpod/server";
import { articleRoutes, fileRoutes, rssRoutes } from "./routes/routes";

export const app = server.app
  .appWithBodyParser(
    server.app.appWithEnvironment(server.app.appWithCookieParser())
  )
  .use(rssRoutes)
  .use(articleRoutes)
  .use(fileRoutes);
