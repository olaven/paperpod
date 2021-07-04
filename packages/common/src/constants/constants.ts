import { logger } from "../logger/logger";

logger.debug({
  message: "setting up constants",
  env: process.env.NODE_ENV,
});

export const APPLICATION_URL = () =>
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : `https://paperpod.fm`; //TODO: more elegant dev-variation
export const TOKEN_COOKIE_HEADER = () => "x-paperpod-token-cookie";
