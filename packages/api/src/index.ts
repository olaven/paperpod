import { boot } from "@paperpod/server";
import { app } from "./app";

boot("/api", app);