import { Stripe } from "stripe";
import { constants } from "../../../common/src";
const stripe = new Stripe("TODO_SOME_KEY", {
  //null, i.e. account default version
  apiVersion: null,
});

/**
 * This function filters out any Stripe resource
 * not meant for Paperpod.
 *
 * Stripe resources meant for Paperpod
 * has a metadata property "collection" with a value
 * of "paperpod".
 *
 * This is necessary because the same Stripe
 * account could be used with the same account
 */
const filterPaperpodResources = <
  T extends {
    metadata: any;
  }
>(
  resources: T[]
) =>
  resources.filter((resource) => resource.metadata.collection === "paperpod");

const getProducts = async () => {
  const { data: products } = await stripe.products.list({
    type: "service",
  });
  return filterPaperpodResources(products);
};

const getPrices = async (product: Stripe.Product) => {
  const { data: prices } = await stripe.prices.list({
    product: product.id,
  });

  return filterPaperpodResources(prices);
};

export const createPaymentSessions = async () => {
  /*
  NOTE: 
  if ever having multiple products and/or prices, this breaks. 
  It always takes the first one
  */

  const [product] = await getProducts();
  const [price] = await getPrices(product);

  const session = stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [price],
    success_url: `${constants.APPLICATION_URL}/payment/success`,
    cancel_url: `${constants.APPLICATION_URL}/payment/failure`,
  });

  return session;
};
