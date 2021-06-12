import { logger } from "@paperpod/common";
import * as server from "@paperpod/server";
import { userRoutes } from "./routes/routes";

export const app = server.app

  .appWithEnvironment(server.app.appWithBodyParser())
  .use((request, response, next) => {
    logger.debug(`authentication app received ${request.url}`);
    next();
  })
  .use("", userRoutes);
