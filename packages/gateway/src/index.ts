import querystring from "querystring"
import bodyParser from "body-parser"
import { createProxyMiddleware } from "http-proxy-middleware";
import { boot } from "common/src/server/boot";

const { API_PORT, AUTHENTICATION_PORT, WEB_PORT } = process.env;
boot("", (gateway) => {

    gateway.use(bodyParser.json())

    const forward = (path: string, target: string) => {

        gateway.use(path, createProxyMiddleware({
            target,
            onProxyReq: (proxyReq, req, res) => {

                if (!req.body || !Object.keys(req.body).length) {
                    return;
                }

                const contentType = proxyReq.getHeader('Content-Type');
                const writeBody = (bodyData: string) => {
                    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                    proxyReq.write(bodyData);
                };

                if (contentType.toString().includes('application/json')) {
                    writeBody(JSON.stringify(req.body));
                }

                if (contentType === 'application/x-www-form-urlencoded') {
                    writeBody(querystring.stringify(req.body));
                }
            }
        }));
    }

    forward("/proxy", 'www.google.com');
    forward("/api", "http://api:" + API_PORT);
    forward("/authentication", "http://authentication:" + AUTHENTICATION_PORT);
    forward("/", "http://web:" + WEB_PORT);
});
