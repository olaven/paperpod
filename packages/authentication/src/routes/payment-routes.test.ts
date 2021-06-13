import { app } from "../app";
import { NOT_IMPLEMENTED } from "node-kall";
import supertest from "supertest";

const postCheckoutSession = (agent = supertest.agent(app)) =>
  agent.post("/checkout-session");

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
  });
});
