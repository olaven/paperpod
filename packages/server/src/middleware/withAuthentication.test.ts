import { sign } from "../jwt/jwt";
import faker from "faker";
import { constants } from "@paperpod/common";
import { FORBIDDEN } from "kall";
import express from "express";
import {
  withAuthentication,
  getBearerToken,
  getToken,
} from "./withAuthentication";
import { test } from "@paperpod/common";
import { createFakeUserMiddlewareRunner } from "./middleware-test-utils";

describe("Authentication verifying that caller is authenticated", () => {
  const fakeWithAuthentication =
    createFakeUserMiddlewareRunner(withAuthentication);

  it("Does not forward if token is invalid", () => {
    const spy = jest.fn();
    fakeWithAuthentication(
      { bearer: faker.random.alphaNumeric() },
      (request, response, user) => {
        spy();
      }
    );

    expect(spy).not.toHaveBeenCalled();
  });

  it("Does forward if a user was encrypted with that token", () => {
    const token = sign(test.mocks.user());
    const spy = jest.fn();

    fakeWithAuthentication({ bearer: token }, (request, response, user) => {
      spy();
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Does forward the same user as the one signed with the token", () => {
    const originalUser = test.mocks.user();
    const token = sign(originalUser);

    fakeWithAuthentication(
      { bearer: token },
      (request, response, forwardedUser) => {
        expect(forwardedUser).toEqual(originalUser);
      }
    );
  });

  it("Does forward user based on cookie token, if it's present", () => {
    const originalUser = test.mocks.user();
    const bearer = null;
    const cookie = sign(originalUser);

    fakeWithAuthentication(
      { bearer, cookie },
      (request, response, forwardedUser) => {
        expect(forwardedUser).toEqual(originalUser);
      }
    );
  });

  it("Does not forward if there is no token at all", () => {
    const spy = jest.fn();
    fakeWithAuthentication(
      { bearer: null, cookie: null },
      (req, response, user) => {
        spy();
      }
    );

    expect(spy).not.toHaveBeenCalled();
  });

  it("returns FORBIDDEN if there's no user", () => {
    const token = sign({});

    fakeWithAuthentication({ bearer: token }, (request, response, user) => {
      expect(user).toBeNull();
      expect(response.statusCode).toEqual(FORBIDDEN);
    });
  });
});

describe("Extraction of bearer token from a request", () => {
  it("Extract the correct token value", () => {
    const token = faker.datatype.uuid();
    //@ts-expect-error
    const extracted = getBearerToken({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    expect(extracted).toEqual(token);
  });

  it("Returns null if there's not auth header", () => {
    //@ts-expect-error
    const extracted = getBearerToken({
      headers: {
        authorization: undefined,
      },
    });

    expect(extracted).toBeNull();
  });
});

describe("Helper function for getting the token", () => {
  const tokens = () => ({
    bearerToken: faker.datatype.uuid(),
    cookieToken: faker.datatype.uuid(),
  });

  const request = ({
    bearerToken,
    cookieToken,
  }: {
    bearerToken: string;
    cookieToken: string;
  }) =>
    ({
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
      cookies: {
        [constants.TOKEN_COOKIE_HEADER()]: cookieToken,
      },
    } as any as express.Request);

  it("Does not throw", () => {
    expect(() => getToken(request(tokens()))).not.toThrow();
  });

  it("Returns the bearer token if it is defined", () => {
    const expected = faker.datatype.uuid();
    const actual = getToken(
      request({
        ...tokens(),
        bearerToken: expected,
      })
    );

    expect(actual).toBeDefined();
    expect(actual).toEqual(expected);
  });

  it("Returns the bearer token if both cookie and bearer token are defined", () => {
    const bearerToken = faker.datatype.uuid();
    const cookieToken = faker.datatype.uuid();

    const actual = getToken(
      request({
        bearerToken,
        cookieToken,
      })
    );

    expect(actual).toEqual(bearerToken);
    expect(actual).not.toEqual(cookieToken);
  });

  const falsyTokens = ["", null, undefined, "null", "undefined"];

  falsyTokens.forEach((bearerToken) => {
    it(`Returns the cookie token if bearer token is ${bearerToken}`, () => {
      const cookieToken = faker.datatype.uuid();
      const actual = getToken(
        request({
          cookieToken,
          bearerToken,
        })
      );

      expect(cookieToken).toBeDefined();
      expect(actual).toEqual(cookieToken);
    });
  });

  [...falsyTokens, "some-defined-token"].forEach((cookieToken) => {
    it(`Returns defined bearer token when cookie token is ${cookieToken}`, () => {
      const bearerToken = faker.datatype.uuid();
      const actual = getToken(
        request({
          bearerToken,
          cookieToken,
        })
      );

      expect(bearerToken).toBeDefined();
      expect(actual).toEqual(bearerToken);
    });
  });

  it("Returns null if both bearer token and cookie token are null", () => {
    const actual = getToken(
      request({
        cookieToken: null,
        bearerToken: null,
      })
    );

    expect(actual).toEqual(null);
  });
});
