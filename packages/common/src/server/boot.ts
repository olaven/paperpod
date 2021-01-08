import bodyParser from "body-parser"
import express from "express";
import * as dotenv from "dotenv";



export const boot = (path: string, callback: (handler: express.Express) => void) => {

    dotenv.config();

    const app = express();
    const handler = express();

    handler.use(express.json());
    handler.use(express.urlencoded({ extended: true }))
    app.use("/" + path, handler);

    callback(handler);

    const port = process.env.PORT;
    app.listen(port, () => {

        console.log(path + "is listening on port", port, "at /", path);
    });
}