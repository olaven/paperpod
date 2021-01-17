
import { server } from "@paperpod/common";
import { app } from "./app";

server.boot("/authentication", app);