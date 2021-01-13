import express from "express";
import { server } from "common"
import { createProxy } from "./proxy";

const withProxies = (
    pairs: [string, string][],
    app = express()
) => {
    pairs.forEach(
        ([path, target]) => createProxy(app)(path, target))
    return app;
}

const mapping = (path: string, hostname: string, port: string): [string, string] => [
    path,
    "http://" + hostname + ":" + port
]

export const app = withProxies(
    [
        mapping("/api", "api", process.env.API_PORT),
        mapping("/authentication", "authentication", process.env.AUTHENTICATION_PORT),
        mapping("/", "web", process.env.WEB_PORT),
    ],
    server.app.appWithEnvironment()
)

server.boot("", app);