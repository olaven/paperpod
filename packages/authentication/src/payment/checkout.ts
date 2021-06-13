import { Stripe } from "stripe";
const stripe = new Stripe("TODO_SOME_KEY", {
  //null, i.e. account default version
  apiVersion: null,
});

const getPaperpodProduct = async () => {
  //FIXME: Figure out how to query for metadata -> collection -> "paperpod" (see stripe.tf)
  stripe.products.list({
    type: "service",
  });
};

export const createPaymentSessions = async () => {
  const product = getPaperpodProduct();

  //see https://stripe.com/docs/billing/subscriptions/checkout
  const session = stripe.checkout.sessions.create(product.id);
};
