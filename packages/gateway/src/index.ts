
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

const httpServer = http.createServer(app);


httpServer.listen(process.env.PORT, () => {
    console.log("HTTP Server is running");
});

if (process.env.NODE_ENV !== "development") {


    try {

        const httpsServer = https.createServer({
            key: fs.readFileSync('./certs/privkey.pem', 'utf8'),
            cert: fs.readFileSync('./certs/cert.pem', 'utf8'),
            ca: fs.readFileSync('./certs/chain.pem', 'utf8'),
        }, app);

        httpsServer.listen(443, () => {

            console.log("HTTPS server is running");
        });
    } catch (error) {

        console.log(`Crashed with error: ${error}`);
    }
}
