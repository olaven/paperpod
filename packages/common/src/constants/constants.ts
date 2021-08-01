import { logger } from "../logger/logger";

logger.debug({
  message: "setting up constants",
  env: process.env.NODE_ENV,
});

export const APPLICATION_URL = () =>
  //@ts-ignore web has "development" as it's type and fails on this check
  process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "test"
    ? "http://localhost:8080"
    : `https://paperpod.fm`; //TODO: more elegant dev-variation
export const TOKEN_COOKIE_HEADER = () => "x-paperpod-token-cookie";
