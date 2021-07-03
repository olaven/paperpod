import { nanoid } from "nanoid";
import { Stripe } from "stripe";
import { test } from "@paperpod/common";
import { stripeResource } from "../test-utils/test-utils";
import { makeStripeFunctions } from "./stripe";

const mockStripe = ({
  createSession = jest.fn((options: Stripe.Checkout.SessionCreateParams) => ({
    id: nanoid(),
  })),
  listPrices = jest.fn((options: Stripe.PriceListParams) =>
    stripeResource([{ id: nanoid() }])
  ),
  listProducts = jest.fn((options: Stripe.ProductListParams) =>
    stripeResource([{ id: nanoid() }])
  ),
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
  });
};

describe("Functions for interacting with Stripe", () => {
  it("Does not throw", () => {
    const { getProducts } = mockStripe();
    expect(getProducts()).resolves.not.toThrow();
  });

  it("Returns a product with id same as stripe", async () => {
    const product = { id: nanoid() };
    const { getProducts } = mockStripe({
      listProducts: jest.fn((options) => stripeResource([product])),
    });

    const products = await getProducts();

    expect(products.length).toEqual(1);
    expect(products[0].id).toEqual(product.id);
  });

  it("Returns only the products returned by stripe", async () => {
    const expected = [{ id: nanoid() }, { id: nanoid() }];

    const { getProducts } = mockStripe({
      listProducts: jest.fn((options) => stripeResource(expected)),
    });

    const actual = await getProducts();

    expect(actual.length).toEqual(expected.length);
    const [firstExpected, secondExpected] = expected;
    const [firstActual, secondActual] = actual;

    expect(firstExpected.id).toEqual(firstActual.id);
    expect(secondExpected.id).toEqual(secondActual.id);
  });

  it("Does create a session based on the correct product", async () => {
    const product = { id: nanoid() };

    const listProducts = jest.fn((options) => stripeResource([product]));
    const listPrices = jest.fn((options) => stripeResource([{ id: nanoid() }]));
    const { createPaymentSession: createPaymentSession } = mockStripe({
      listProducts,
      listPrices,
    });

    await createPaymentSession(test.mocks.user());

    expect(listPrices).toHaveBeenCalledWith({
      product: product.id,
    });
  });

  it("Does create a session based on the correct price", async () => {
    const price = { id: nanoid() };

    const listPrices = jest.fn((options) => stripeResource([price]));
    const createSession = jest.fn((options) => {
      expect(options.line_items[0].price).toEqual(price.id);
      return { id: nanoid() };
    });
    const { createPaymentSession: createPaymentSession } = mockStripe({
      listPrices,
      createSession,
    });

    await createPaymentSession(test.mocks.user());

    /*NOTE: check is inside this mock. 
    If the mock does not run, the assertion does not run*/
    expect(createSession).toHaveBeenCalled();
  });
});
