import pino from "pino";

//configures pino-pretty
const prettyConfiguration =
  process.env.NODE_ENV === "production"
    ? null
    : {
        colorize: true,
      };

export const logger = pino({
  useLevelLabels: true,
  level: process.env.LOG_LEVEL || "debug",
  prettyPrint: prettyConfiguration,
});
