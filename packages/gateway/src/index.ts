import { createProxyMiddleware } from "http-proxy-middleware";
import { boot } from "common/src/server/boot";


boot("", (gateway) => {


    const forward = (path: string, target: string) =>
        gateway.use(path, createProxyMiddleware({
            target
        }));


    const { API_PORT, AUTHENTICATION_PORT, WEB_PORT } = process.env;

    forward("/api", "http://api:" + API_PORT);
    forward("/authentication", "http://authentication:" + AUTHENTICATION_PORT);
    forward("/", "http://web:" + WEB_PORT);
});
