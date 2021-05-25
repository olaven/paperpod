import http from "http";
import * as server from "@paperpod/server";
import { withProxies, mapping } from "./proxy";
import { logger } from "@paperpod/common";

export const app = withProxies(
  [
    mapping("/api", "api", process.env.API_PORT),
    mapping(
      "/authentication",
      "authentication",
      process.env.AUTHENTICATION_PORT
    ),
    mapping("/docs", "docs", process.env.DOCS_PORT),
    mapping("/", "web", process.env.WEB_PORT),
  ],
  server.app.appWithEnvironment()
);

http.createServer(app).listen(process.env.PORT, () => {
  logger.info(`Listening on ${process.env.PORT}`);
});
