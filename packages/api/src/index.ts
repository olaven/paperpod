import { logger } from "@paperpod/common";
import { bootWithMigrations } from "@paperpod/server/src/boot";
import { app } from "./app";

bootWithMigrations("api", app).catch((error) =>
  logger.error({ message: "an error occurred when booting api", error })
);
