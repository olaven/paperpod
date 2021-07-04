import * as server from "@paperpod/server";
import { withProxies, mapping } from "./proxy";
import { healthAll } from "./health-all";

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
  server.app
    .appWithDevCors(server.app.appWithEnvironment())
    .get("/health/all", healthAll)
);

server.boot("", app, "gateway");
