import { logger } from "@paperpod/common";
import express from "express";
import { appWithEnvironment } from "./app/appWithEnvironment";

export const boot = (path: string, app = appWithEnvironment()) =>
  express()
    .use(path, app)
    .listen(process.env.PORT, () => {
      logger.info(path, "is listening on", process.env.PORT);
    });
