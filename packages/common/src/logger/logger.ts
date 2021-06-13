import pino from "pino";

//configures pino-pretty
const prettyConfiguration =
  process.env.NODE_ENV === "production"
    ? null
    : {
        colorize: true,
      };

const level = process.env.LOG_LEVEL || "debug";
console.log("INITIALIZING LOGGER WITH LEVEL", level);

export const logger = pino({
  useLevelLabels: true,
  level,
  prettyPrint: prettyConfiguration,
});
