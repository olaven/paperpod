import { del } from "node-kall";
import { constants, models } from "@paperpod/common";
import { bearer } from "./bearer";

export const cancelSubscription = (user: models.User, token: string) =>
  del(
    `${constants.APPLICATION_URL()}/authentication/users/${
      user.id
    }/subscription`,
    bearer(token)
  );
