import { logger } from "@paperpod/common";
import * as server from "@paperpod/server";
import { paymentRoutes } from "./routes/payment-routes";
import { userRoutes } from "./routes/routes";

export const app = server.app

  .appWithEnvironment(server.app.appWithBodyParser())
  .use("", userRoutes)
  .use("", paymentRoutes);
