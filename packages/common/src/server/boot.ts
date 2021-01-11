import express from "express";
import { appWithEnvironment } from "./appWithEnvironment";

export const boot = (path: string, app = appWithEnvironment()) =>
    express()
        .use(express.json())
        .use(express.urlencoded({ extended: true }))
        .use(path, app)
        .listen(process.env.PORT, () => {

            console.log(path, "is listening on", process.env.PORT);
        });
