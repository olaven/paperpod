import * as server from "@paperpod/server";
import { subscriptionStatusRoute } from "./routes/internal/subscription-status-route";
import { paymentRoutes } from "./routes/public/payment-routes";
import { subscriptionManagementRoutes } from "./routes/public/subscription-management-routes";
import { userRoutes } from "./routes/public/user-routes";

export const publicAuthenticationApp = server.app

  .appWithEnvironment(
    server.app.appWithBodyParser(server.app.appWithCookieParser())
  )
  .use("", userRoutes)
  .use("", paymentRoutes)
  .use("", subscriptionManagementRoutes);

export const internalAuthenticationApp = server.app
  .appWithEnvironment(server.app.appWithBodyParser())
  .use("", subscriptionStatusRoute);
