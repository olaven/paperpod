import fs from "fs";
import http from "http";
import https from "https";
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

const actualServer =
  // process.env.NODE_ENV === "production"
  false //FIXME: add back production check when certs are fixed
    ? https.createServer(
        {
          key: fs.readFileSync(
            "/etc/letsencrypt/live/paperpod.fm/privkey.pem",
            "utf8"
          ),
          cert: fs.readFileSync(
            "/etc/letsencrypt/live/paperpod.fm/cert.pem",
            "utf8"
          ),
          ca: fs.readFileSync(
            "/etc/letsencrypt/live/paperpod.fm/chain.pem",
            "utf8"
          ),
        },
        app
      )
    : http.createServer(app);

const redirectServer = http.createServer(
  server.app.appWithEnvironment().use((request, response) => {
    response.redirect(`https://${request.headers.host}${request.url}`);
  })
);

redirectServer.listen(process.env.GATEWAY_HTTP_PORT, () => {
  logger.info(
    `Redirecting to HTTPS from port ${process.env.GATEWAY_HTTP_PORT}`
  );
});

actualServer.listen(process.env.PORT, () => {
  logger.info(`Listening on ${process.env.PORT}`);
});
