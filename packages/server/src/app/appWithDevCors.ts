import express from "express";
import cors from "cors";
import { logger } from "@paperpod/common";

export const appWithDevCors = (app = express()) => {
  const env = process.env.NODE_ENV;
  if (!env) {
    logger.error({
      message: `appWithDevCors expected NODE_ENV to be defined. Found: ${process.env.NODE_ENV}`,
    });
  }

  const origin = env === "dev" ? "*" : undefined;
  logger.debug(`setting origin to ${origin}`);

  return app.use(
    cors({
      origin,
    })
  );
};
