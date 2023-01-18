import { logger } from "@paperpod/common";
import { boot } from "@paperpod/server";
import { bootWithMigrations } from "@paperpod/server/src/boot";
import { publicAuthenticationApp } from "./app";
import { internalUserApp } from "./internal-user-app";

bootWithMigrations("authentication", publicAuthenticationApp)
  .then(() => {
    /**
     * When checking JWT
     * is not sufficient to
     * determine user validation
     * for other services, this
     * endpoint can communicate
     * over the network.
     *
     * Must not be exposed outside
     * container orchestration.
     */
    boot("/internal", internalUserApp, {
      port: parseInt(process.env.INTERNAL_PORT),
    });
  })
  .catch((error) =>
    logger.error({ message: "an error occurred when booting authentication", error })
  );
