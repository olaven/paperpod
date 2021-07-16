import { sign, decode } from "../jwt/jwt";
import faker from "faker";
import { constants, models } from "@paperpod/common";
import { FORBIDDEN } from "kall";
import express from "express";
import {
  withAuthentication,
  getBearerToken,
  getToken,
} from "./withAuthentication";
import { test } from "@paperpod/common";
import { withActiveSubscription } from "./withActiveSubscription";
import { createFakeUserMiddlewareRunner } from "./middleware-test-utils";

const fakeWithActiveSubscription = createFakeUserMiddlewareRunner(
  withActiveSubscription
);

describe("Middleware checking if the user has an active subscription", () => {
  it("Does forward if the user has an active subscription", () => {
    const token = sign({ ...test.mocks.user(), subscription: "active" });
    const spy = jest.fn();

    fakeWithActiveSubscription({ bearer: token }, (request, response, user) => {
      spy();
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Does not forward if the user does not have an active subscription", () => {
    const token = sign({ ...test.mocks.user(), subscription: "inactive" });
    const spy = jest.fn();

    fakeWithActiveSubscription({ bearer: token }, (request, response, user) => {
      spy();
    });

    expect(spy).not.toHaveBeenCalled();
  });
});
