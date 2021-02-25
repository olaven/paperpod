import express from "express";
import { appWithEnvironment } from "./app/appWithEnvironment";

export const boot = (path: string, app = appWithEnvironment()) =>
    express()
        .use(path, app)
        .use((request, response, next) => {

            console.log(`app on ${path} received ${request.method} to ${request.path}`); 
            next(); 
        })
        .listen(process.env.PORT, () => {

            console.log(path, "is listening on", process.env.PORT);
        });
