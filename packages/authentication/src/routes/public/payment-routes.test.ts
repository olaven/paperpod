import { publicAuthenticationApp } from "../../app";
import {
  FOUND,
  NOT_IMPLEMENTED,
  UNAUTHORIZED,
  CREATED,
  NOT_FOUND,
  BAD_REQUEST,
  FORBIDDEN,
} from "node-kall";
import supertest from "supertest";
import { constants, test } from "@paperpod/common";
import faker from "faker";
import { jwt } from "@paperpod/server";
import { nanoid } from "nanoid";
import { stripeResource } from "../../test-utils/test-utils";
import { users } from "../../authdatabase/authdatabase";

const postCheckoutSession = ({
  token = jwt.sign(test.mocks.user()),
  agent = supertest.agent(publicAuthenticationApp),
} = {}) =>
  agent.post("/checkout-session").set("Authorization", "Bearer " + token);

const getSuccessEndpoint = ({
  sessionId = faker.datatype.uuid(),
  agent = supertest.agent(publicAuthenticationApp),
} = {}) => agent.get(`/payment/success?session_id=${sessionId}`);

const sessionStore: {
  [key in string]: { id: string; client_reference_id: string };
} = {};

const randomSession = ({
  id = faker.datatype.uuid(),
  client_reference_id = faker.datatype.uuid(),
} = {}) => ({
  id,
  client_reference_id,
});

jest.mock("../../payment/stripe", () => {
  return {
    makeStripeFunctions: () => ({
      getProducts: () => stripeResource([{ id: nanoid() }]),
      getPrices: () => stripeResource([{ id: nanoid() }]),
      createPaymentSession: () => ({
        id: nanoid(),
      }),
      getSession: (id: string) => sessionStore[id],
      assignUserToSubscriptionMetadata: () => {},
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

    it("returns with CREATED on successful, authenticated request", async () => {
      const { status } = await postCheckoutSession();
      expect(status).toEqual(CREATED);
    });

    it("Returns a session id on successful request", async () => {
      const { body } = await postCheckoutSession();
      expect(body.sessionId).not.toBeUndefined();
    });
  });

  describe("Handling a successful subscription", () => {
    it("Does respond", async () => {
      const { status } = await getSuccessEndpoint();
      expect(status).not.toBe(NOT_IMPLEMENTED);
    });

    it("Returns NOT_FOUND if Stripe session does not exist", async () => {
      const { status } = await getSuccessEndpoint({
        //NOTE: session id generated on the fly, does not exist otherwhere
        sessionId: faker.datatype.uuid(),
      });

      expect(status).toEqual(NOT_FOUND);
    });

    it("Does not return NOT_FOUND if session does exist", async () => {
      const id = faker.datatype.uuid();
      sessionStore[id] = randomSession({ id });

      const { status } = await getSuccessEndpoint({
        sessionId: id,
      });

      expect(status).not.toEqual(NOT_FOUND);
    });

    it("Returns BAD_REQUEST if there's not client_reference_id", async () => {
      const id = faker.datatype.uuid();
      sessionStore[id] = randomSession({ client_reference_id: null });

      const { status } = await getSuccessEndpoint({
        sessionId: id,
      });

      expect(status).toEqual(BAD_REQUEST);
    });

    it("Returns FORBIDDEN if there's not user wit with the matching client_reference_id", async () => {
      const id = faker.datatype.uuid();
      const client_reference_id = faker.datatype.uuid();
      sessionStore[id] = randomSession({ client_reference_id });

      const { status } = await getSuccessEndpoint({
        sessionId: id,
      });

      expect(status).toEqual(FORBIDDEN);
    });

    it("Returns FOUND if the user does exist", async () => {
      const id = faker.datatype.uuid();
      const user = await users.insert(test.mocks.user());

      sessionStore[id] = randomSession({ client_reference_id: user.id });

      const { status } = await getSuccessEndpoint({
        sessionId: id,
      });

      expect(status).toEqual(FOUND);
    });

    it("Redirects to the application URL on successful request", async () => {
      const id = faker.datatype.uuid();
      const user = await users.insert(test.mocks.user());

      sessionStore[id] = randomSession({ client_reference_id: user.id });

      const { headers, status } = await getSuccessEndpoint({
        sessionId: id,
      });

      expect(status).toEqual(FOUND);
      expect(headers["location"]).toEqual(constants.APPLICATION_URL());
    });

    it("Updates the user subscription status", async () => {
      const id = faker.datatype.uuid();
      const before = await users.insert(test.mocks.user());

      sessionStore[id] = randomSession({ client_reference_id: before.id });

      const { status } = await getSuccessEndpoint({
        sessionId: id,
      });

      const after = await users.getById(before.id);

      expect(after.subscription).toEqual("active");
      expect(after.subscription).not.toEqual(before.subscription);
    });

    it("Does not activate subscription if client_reference does not match a user", async () => {
      const id = faker.datatype.uuid();
      const before = await users.insert(test.mocks.user());

      sessionStore[id] = randomSession({ client_reference_id: before.id });

      const sessionId = faker.datatype.uuid();
      await getSuccessEndpoint({
        //NOTE: not the user id
        sessionId,
      });

      const after = await users.getById(before.id);
      expect(after.subscription).toEqual("inactive");
    });
  });
});
