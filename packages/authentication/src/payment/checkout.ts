import { Stripe } from "stripe";
import { constants } from "../../../common/src";

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

//NOTE: exported only for tests
const _getProducts = (stripe: Stripe) => async () => {
  const { data: products } = await stripe.products.list({
    type: "service",
  });
  return filterPaperpodResources(products);
};

//NOTE: exported only for tests
const _getPrices = (stripe: Stripe) => async (product: Stripe.Product) => {
  const { data: prices } = await stripe.prices.list({
    product: product.id,
  });

  return filterPaperpodResources(prices);
};

const _createPaymentSession = (stripe: Stripe) => async () => {
  /*
    NOTE: 
    if ever having multiple products and/or prices, this breaks. 
    It always takes the first one
    */

  const [product] = await _getProducts(stripe)();
  const [price] = await _getPrices(stripe)(product);

  const session = stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [price],
    success_url: `${constants.APPLICATION_URL}/payment/success`,
    cancel_url: `${constants.APPLICATION_URL}/payment/failure`,
  });

  return session;
};

export const makeCheckoutFunctions = (stripe: Stripe) => ({
  createPaymentSession: _createPaymentSession(stripe),
  getProducts: _getProducts(stripe),
  getPrices: _getPrices(stripe),
});
