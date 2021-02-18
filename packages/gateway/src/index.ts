
import fs from "fs";
import http from "http";
import https from "https";
import * as server from "@paperpod/server"
import { withProxies, mapping } from "./proxy";


export const app = withProxies(
    [
        mapping("/api", "api", process.env.API_PORT),
        mapping("/authentication", "authentication", process.env.AUTHENTICATION_PORT),
        mapping("/", "web", process.env.WEB_PORT),
    ],
    server.app.appWithEnvironment()
);

const actualServer = process.env.NODE_ENV === "production" ?
    https.createServer({
        key: fs.readFileSync('/etc/letsencrypt/live/application.paperpod.fm/privkey.pem', 'utf8'),
        cert: fs.readFileSync('/etc/letsencrypt/live/application.paperpod.fm/cert.pem', 'utf8'),
        ca: fs.readFileSync('/etc/letsencrypt/live/application.paperpod.fm/chain.pem', 'utf8'),
    }, app) :
    http.createServer(app);

actualServer.listen(process.env.PORT, () => {

    console.log(`Listening on ${process.env.PORT}`);
});