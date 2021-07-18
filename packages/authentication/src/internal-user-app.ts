import * as server from "@paperpod/server";
import { subscriptionStatusRoute } from "./routes/internal/subscription-status-route";

export const internalUserApp = server.app

  .appWithEnvironment(server.app.appWithBodyParser())
  .use("", subscriptionStatusRoute);
