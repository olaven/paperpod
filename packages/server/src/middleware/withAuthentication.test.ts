import { sign, decode } from "../jwt/jwt";
import faker from "faker";
import { models } from "@paperpod/common";
import { FORBIDDEN } from "kall";
import express from "express";
import { withAuthentication, getBearerToken } from "./withAuthentication";
import { mocks } from "@paperpod/common/src/test/test";

describe("Authentication verifying that caller is authenticated", () => {
  const useWithToken = (
    token: string,
    handler: (
      request: express.Request,
      response: express.Response,
      user: models.User
    ) => void
  ) =>
    withAuthentication(handler)(
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      } as any,
      {
        status: (code: number) => ({
          end: () => {},
        }),
      } as any
    );

  it("Does not forward if token is invalid", () => {
    const spy = jest.fn();
    useWithToken(faker.random.alphaNumeric(), (request, response, user) => {
      spy();
    });

    expect(spy).not.toHaveBeenCalled();
  });

  it("Does forward if a user was encrypted with that token", () => {
    const token = sign(mocks.user());
    const spy = jest.fn();

    useWithToken(token, (request, response, user) => {
      spy();
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Does forward the same user as the one signed with the token", () => {
    const originalUser = mocks.user();
    const token = sign(originalUser);

    useWithToken(token, (request, response, forwardedUser) => {
      expect(forwardedUser).toEqual(originalUser);
    });
  });

  it("Does not forward if there is no token at all", () => {
    const spy = jest.fn();
    useWithToken(null, (req, response, user) => {
      spy();
    });

    expect(spy).not.toHaveBeenCalled();
  });

  it("returns FORBIDDEN if there's no user", () => {

    const token = sign({})
    
    useWithToken(token, (request, response, user) => {
      expect(user).toBeNull(); 
      expect(response.statusCode).toEqual(FORBIDDEN); 
    })
  })

  describe("Extraction of bearer token from a request", () => {

    it("Extract the correct token value", () => {

      const token = faker.datatype.uuid(); 
      //@ts-expect-error
      const extracted = getBearerToken({
        headers: {
          authorization: `Bearer ${token}`
        }
      }); 

      expect(extracted).toEqual(token); 
    });

    it("Returns null if there's not auth header", () => {

      //@ts-expect-error
      const extracted = getBearerToken({
        headers: {
          authorization: undefined
        }
      }); 

      expect(extracted).toBeNull(); 
    });
  });
});
