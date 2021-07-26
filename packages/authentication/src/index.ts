import { boot } from "@paperpod/server";
import { publicAuthenticationApp } from "./app";
import { internalUserApp } from "./internal-user-app";

boot("/authentication", publicAuthenticationApp);

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
