import { get, OK } from "node-kall";
import { models } from "@paperpod/common";
import { getAdminBasic } from "./ipc-env-check";

export const hasValidSubscription = async (id: string) => {
  const [status, payload] = await get<models.UserSubscriptionStatusResponse>(
    `http://authentication:${process.env.AUTHENTICATION_INTERNAL_PORT}/internal/users/${id}/subscription`,
    getAdminBasic()
  );

  if (status !== OK) {
    throw `Error reaching auth container ${status}`;
  }

  return payload.subscription === "active";
};
