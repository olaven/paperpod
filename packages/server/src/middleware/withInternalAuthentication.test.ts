import faker from "faker";
import * as express from "express";
import {
  withInternalAuthentication,
  getBasicAuth,
} from "./withInternalAuthentication";
import { withInternalAuth } from "./middleware";

const mockRequest = (username: string, password) =>
  ({
    headers: { authorization: `Basic ${username}:${password}` },
  } as express.Request);

describe("Testing internal state middleware", () => {
  describe("Testing preconditions", () => {
    it("Does have an admin username in the environment", () => {
      const { ADMIN_USERNAME } = process.env;
      expect(ADMIN_USERNAME).toBeDefined();
    });

    it("Does have an admin password in the environment", () => {
      const { ADMIN_PASSWORD } = process.env;
      expect(ADMIN_PASSWORD).toBeDefined();
    });
  });

  describe("The internal auth middleware", () => {
    const runWith = (
      username: string,
      password: string,
      handler = jest.fn()
    ) => {
      const request = mockRequest(username, password);
      const response = {
        status: (code: number) => ({
          end: () => {},
        }),
      } as any;
      return withInternalAuthentication(handler)(request, response);
    };

    it("Returns forbidden if there are no credentials", () => {
      const request = {
        headers: {
          /* NOTE: no auth header */
        },
      } as express.Request;

      const handler = jest.fn();
      withInternalAuthentication(handler)(request, {
        status: (code: number) => ({
          end: () => {},
        }),
      } as any);

      expect(handler).not.toHaveBeenCalled();
    });

    it("Does not forward if password is invalid", () => {
      const spy = jest.fn();

      const username = process.env.ADMIN_USERNAME;
      const password = faker.internet.password();
      runWith(username, password);

      expect(spy).not.toHaveBeenCalled();
      expect(username).toEqual(process.env.ADMIN_USERNAME);
      expect(password).not.toEqual(process.env.ADMIN_PASSWORD);
    });

    it("Does not forward if username is invalid", () => {
      const spy = jest.fn();

      const username = faker.internet.userName();
      const password = process.env.ADMIN_PASSWORD;
      runWith(username, password);

      expect(spy).not.toHaveBeenCalled();
      expect(username).not.toEqual(process.env.ADMIN_USERNAME);
      expect(password).toEqual(process.env.ADMIN_PASSWORD);
    });

    it("Does forward if username and password is valid", () => {
      const handler = jest.fn();

      const username = process.env.ADMIN_USERNAME;
      const password = process.env.ADMIN_PASSWORD;
      runWith(username, password, handler);

      expect(handler).toHaveBeenCalled();
      expect(username).toEqual(process.env.ADMIN_USERNAME);
      expect(password).toEqual(process.env.ADMIN_PASSWORD);
    });
  });

  describe("The utility method for getting username and password", () => {
    it("Does return a standard username and password", () => {
      const username = faker.internet.userName();
      const password = faker.internet.password();

      const result = getBasicAuth(mockRequest(username, password));
      expect(result).toEqual({
        username,
        password,
      });
    });

    it("Includes ':' in passwords", () => {
      const username = faker.internet.userName();
      const password = `${faker.internet.password()}:${faker.internet.password()}`;
      expect(password).toContain(":");

      const result = getBasicAuth(mockRequest(username, password));
      expect(result).toEqual({ username, password });
    });

    it("Returns null if no auth header is provided", () => {
      const result = getBasicAuth({
        headers: {},
      } as express.Request);

      expect(result).toEqual(null);
    });
  });
});
