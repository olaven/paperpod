import express from "express";
import { appWithEnvironment } from "./appWithEnvironment";

export const boot = (
    path: string,
    app = appWithEnvironment()
) => {

    const handler = express();

    handler.use(express.json());
    handler.use(express.urlencoded({ extended: true }))
    app.use("/" + path, handler);

    const port = process.env.PORT;
    app.listen(port, () => {

        console.log(path + "is listening on port", port, "at /", path);
    });
}