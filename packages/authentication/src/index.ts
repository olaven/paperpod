
import { server } from "common";
import { app } from "./app";

server.boot("/authentication", app);