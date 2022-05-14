import { nanoid } from "nanoid";
import faker from "faker";
import Stripe from "stripe";
import { makeStripeFunctions } from "../payment/stripe";
import { migrate } from "@paperpod/server";
import { getConfiguration } from "@paperpod/server/src/database/configuration";

export const stripeResource = <T>(resources: T[]) => ({
  data: resources.map((resource) => ({
    ...resource,
    metadata: {
      collection: "paperpod",
    },
  })),
});

export const mockStripe = ({
  createSession = jest.fn((options: Stripe.Checkout.SessionCreateParams) => ({
    id: nanoid(),
  })),
  listPrices = jest.fn((options: Stripe.PriceListParams) =>
    stripeResource([{ id: nanoid() }])
  ),
  listProducts = jest.fn((options: Stripe.ProductListParams) =>
    stripeResource([{ id: nanoid() }])
  ),
  getCustomer = jest.fn((id: string) => ({ email: faker.internet.email() })),
} = {}) => {
  return makeStripeFunctions({
    checkout: {
      sessions: {
        //@ts-expect-error
        create: createSession,
      },
    },
    prices: {
      //@ts-expect-error
      list: listPrices,
    },
    products: {
      //@ts-expect-error
      list: listProducts,
    },
    customers: {
      //@ts-expect-error
      retrieve: getCustomer,
    },
  });
};

/**
 * NOTE:
 * Adapted from: https://gist.github.com/the-vampiire/a564af41ed0ce8eb7c30dbe6c0f627d8
 * Thanks.
 */
const extractCookies = (
  headers: object
): {
  name: string;
  value: string;
  properties: string[];
}[] => {
  const cookies = headers["set-cookie"] as string[];
  if (!cookies) throw "no cookies defined";

  return cookies.map((cookie) => {
    const [name, ...rest] = cookie.split("=");
    const parts = rest.join("=").split("; ");

    const [value, ...properties] = parts;

    return { name, value, properties };
  });
};

export const extractCookieByName = (name: string, headers: object) =>
  extractCookies(headers).find((cookie) => cookie.name === name);

/*
TODO: very similar to a function in test-utils@api. 
Is it the beginning of a shared-test package?
*/
export const setupMigrations = () =>
  beforeAll(async () => {
    await migrate({
      configuration: getConfiguration(),
      schema: "authentication",
    });
  });
