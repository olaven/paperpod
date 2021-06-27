import { models } from "@paperpod/common";
import { post } from "node-kall";
import { bearer } from "./bearer";

export const postPaymentSession = (token: string, baseUrl: string) => {
  return post<null, models.CheckoutSessionResponse>(
    `${baseUrl}/authentication/checkout-session`,
    null,
    bearer(token)
  );
};
