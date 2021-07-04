import { Stripe } from "stripe";

import { constants, logger, models } from "../../../common/src";

/**
 * Default stripe configuration.
 * Not applied directly, but passed
 * back from importing files.
 *
 * This makes mocking Stripe easier.
 */
export const stripe = new Stripe(process.env.STRIPE_API_KEY, {
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

const _getProducts = (stripe: Stripe) => async () => {
  const { data: products } = await stripe.products.list({
    type: "service",
  });

  return filterPaperpodResources(products);
};

const _getPrices = (stripe: Stripe) => async (product: Stripe.Product) => {
  const { data: prices } = await stripe.prices.list({
    product: product.id,
  });

  return prices; // return filterPaperpodResources(prices);
};

const _createPaymentSession = (stripe: Stripe) => async (user: models.User) => {
  /*
    NOTE: 
    if ever having multiple products and/or prices, this breaks. 
    It always takes the first one
    */

  const [product] = await _getProducts(stripe)();
  const [price] = await _getPrices(stripe)(product);

  const session = stripe.checkout.sessions.create({
    /*NOTE: this is used to get the correct user 
    when redirected back from Stripe*/
    client_reference_id: user.id,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
    success_url: `${constants.APPLICATION_URL()}/authentication/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${constants.APPLICATION_URL()}/authentication/payment/cancelled`,
  });

  return session;
};

const _getSession = (stripe: Stripe) => async (id: string) => {
  const session = await stripe.checkout.sessions.retrieve(id);
  return session;
};

const _assignUserToSubscriptionMetadata =
  (stripe: Stripe) => async (user: models.User, subscriptionId: string) => {
    const metadata = {
      userId: user.id,
    };
    await stripe.subscriptions.update(subscriptionId, {
      metadata,
    });
    logger.debug({
      message: "Assigning metadata to subscription",
      metadata,
      user,
    });
  };

const _getCustomer = (stripe: Stripe) => async (id: string) => {
  const customer = await stripe.customers.retrieve(id);
  return customer as Stripe.Customer;
};

export const makeStripeFunctions = (stripe: Stripe) => ({
  createPaymentSession: _createPaymentSession(stripe),
  getProducts: _getProducts(stripe),
  getPrices: _getPrices(stripe),
  getSession: _getSession(stripe),
  assignUserToSubscriptionMetadata: _assignUserToSubscriptionMetadata(stripe),
  getCustomer: _getCustomer(stripe),
});
