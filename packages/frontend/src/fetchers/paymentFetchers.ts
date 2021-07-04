import { models, constants } from "@paperpod/common";
import { post } from "node-kall";
import { bearer } from "./bearer";

export const postPaymentSession = (token: string) => {
  return post<null, models.CheckoutSessionResponse>(
    `${constants.APPLICATION_URL()}/authentication/checkout-session`,
    null,
    bearer(token)
  );
};
