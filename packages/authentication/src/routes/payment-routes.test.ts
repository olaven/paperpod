import { app } from "../app";
import { NOT_IMPLEMENTED, UNAUTHORIZED, OK } from "node-kall";
import supertest from "supertest";
import { test } from "@paperpod/common";
import { jwt } from "../../../server/src";
import { nanoid } from "nanoid";
import { stripeResource } from "../testUtils";

const postCheckoutSession = ({
  token = jwt.sign(test.mocks.user()),
  agent = supertest.agent(app),
} = {}) =>
  agent.post("/checkout-session").set("Authorization", "Bearer " + token);

jest.mock("../payment/checkout", () => {
  return {
    makeCheckoutFunctions: () => ({
      getProducts: () => stripeResource([{ id: nanoid() }]),
      getPrices: () => stripeResource([{ id: nanoid() }]),
      createPaymentSession: () => ({
        id: nanoid(),
      }),
    }),
  };
});

describe("Payment endpoints", () => {
  describe("Creating a checkout session", () => {
    it("Does respond", async () => {
      const { status } = await postCheckoutSession();
      expect(status).toBeDefined();
      expect(status).not.toBeNaN();
    });

    it("Does not respond with NOT_IMPLEMENTED", async () => {
      const { status } = await postCheckoutSession();

      expect(status).not.toEqual(NOT_IMPLEMENTED);
    });

    it("returns UNAUTHORIZED WITHOUT AUTHENTICATION", async () => {
      const { status } = await postCheckoutSession({
        token: null,
      });

      expect(status).toEqual(UNAUTHORIZED);
    });

    it("returns with OK on successful, authenticated request", async () => {
      const { status } = await postCheckoutSession();
      expect(status).toEqual(OK);
    });

    it("Returns a session id on successful request", async () => {
      const { body } = await postCheckoutSession();
      expect(body.sessionId).not.toBeUndefined();
    });
  });
});
