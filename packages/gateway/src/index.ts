import * as express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

const forward = (path: string, target: string) =>
    app.use(path, createProxyMiddleware({
        target
    }));


forward("/api", "http://api:8080");
forward("/authentication", "http://authentication:8080");
forward("/", "http://web:3000");

const port = process.env.PORT;
app.listen(port, () => {

    console.log("Gateway is listening", port);
});