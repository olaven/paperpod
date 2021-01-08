import { appWithEnvironment } from "common/src/server/appWithEnvironment";
import express from "express";
import { boot } from "common/src/server/boot";
import { createProxy } from "./proxy";

const withProxies = (
    pairs: [string, string][],
    app = express()
) => {
    pairs.forEach(
        ([path, target]) => createProxy(app)(path, target))
    return app;
}

export const app = withProxies(
    [
        ["/api", "http://api:" + process.env.API_PORT],
        ["/authentication", "http://authentication:" + process.env.AUTHENTICATION_PORT],
        ["/", "http://web:" + process.env.WEB_PORT],
    ],
    appWithEnvironment()
)

boot("", app);