import { server } from "common";
import { app } from "./app";

server.boot("/api", app);