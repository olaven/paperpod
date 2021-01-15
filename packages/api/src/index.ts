import { server } from "@paperpod/common";
import { app } from "./app";

server.boot("/api", app);