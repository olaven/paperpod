import express from "express";
import querystring from "querystring";
import { createProxyMiddleware } from "http-proxy-middleware";

export const withProxies = (pairs: [string, string][], app = express()) => {
  pairs.forEach(([path, target]) => createProxy(app)(path, target));
  return app;
};

export const mapping = (
  path: string,
  hostname: string,
  port: string
): [string, string] => [path, "http://" + hostname + ":" + port];

const createProxy = (handler: express.Express) => (
  path: string,
  target: string
) => {
  handler.use(
    path,
    createProxyMiddleware({
      target,
      //Workaround while waiting for bugfix. See: https://github.com/chimurai/http-proxy-middleware/issues/320 and https://github.com/chimurai/http-proxy-middleware/pull/492
      onProxyReq: (proxyReq, req, res) => {
        if (!req.body || !Object.keys(req.body).length) {
          return;
        }

        const contentType = proxyReq.getHeader("Content-Type");
        const writeBody = (bodyData: string) => {
          proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
          proxyReq.write(bodyData);
        };

        if (contentType === "application/json") {
          writeBody(JSON.stringify(req.body));
        }

        if (contentType === "application/x-www-form-urlencoded") {
          writeBody(querystring.stringify(req.body));
        }
      },
    })
  );
};
