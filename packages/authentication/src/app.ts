import * as server from "@paperpod/server";
import { paymentRoutes } from "./routes/payment-routes";
import { userRoutes } from "./routes/routes";

export const app = server.app

  .appWithEnvironment(
    server.app.appWithBodyParser(server.app.appWithCookieParser())
  )
  .use("", userRoutes)
  .use("", paymentRoutes);
