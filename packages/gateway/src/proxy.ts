import querystring from "querystring";
import e from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

export const createProxy = (handler: e.Express) =>
    (path: string, target: string) => {

        handler.use(path,
            createProxyMiddleware({
                target,
                //Workaround while waiting for bugfix. See: https://github.com/chimurai/http-proxy-middleware/issues/320 and https://github.com/chimurai/http-proxy-middleware/pull/492
                onProxyReq: (proxyReq, req, res) => {
                    if (!req.body || !Object.keys(req.body).length) {
                        return;
                    }

                    const contentType = proxyReq.getHeader('Content-Type');
                    const writeBody = (bodyData: string) => {
                        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                        proxyReq.write(bodyData);
                    };

                    if (contentType === 'application/json') {
                        writeBody(JSON.stringify(req.body));
                    }

                    if (contentType === 'application/x-www-form-urlencoded') {
                        writeBody(querystring.stringify(req.body));
                    }
                }
            }));
    }
