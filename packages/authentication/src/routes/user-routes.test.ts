import express from "express";
import faker from "faker";
import { constants, logger, models, test } from "@paperpod/common";
import { jwt } from "@paperpod/server";
import * as database from "../authdatabase/authdatabase";
import {
  OK,
  BAD_REQUEST,
  CREATED,
  UNAUTHORIZED,
  CONFLICT,
  FORBIDDEN,
} from "node-kall";
import supertest from "supertest";
import { app } from "../app";
import { hash } from "../cryptography/cryptography";
import { credentialsAreValid } from "./user-routes";
import { decode } from "../../../server/src/jwt/jwt";
import { extractCookieByName } from "../test-utils/test-utils";

const signUp = (
  credentials = test.mocks.credentials(),
  agent = supertest.agent(app)
) =>
  agent
    .post("/users")
    .send(credentials as any)
    .withCredentials();

const extractBearerToken = async (test: supertest.Test) => {
  const {
    body: { token },
  } = await test;

  return token;
};

const login = (
  credentials = test.mocks.credentials(),
  agent = supertest.agent(app)
) => agent.post("/users/sessions").send(credentials as any);

describe("The authentication endpoint for users", () => {
  describe("Local test utils", () => {
    describe("extractBearerToken", () => {
      it("Does extract something defined", async () => {
        const token = await extractBearerToken(signUp());

        expect(token).toBeDefined();
      });

      it("Does returns the correct token", async () => {
        const sentToken = faker.datatype.uuid();
        const app = express().get("/", (request, response) => {
          response.json({
            token: sentToken,
          });
        });

        const retrievedToken = await extractBearerToken(
          supertest(app).get("/")
        );

        expect(sentToken).toEqual(retrievedToken);
      });
    });
  });

  describe("function validating credentials", () => {
    it("Does not crash", async () => {
      const user = await database.users.insert(test.mocks.user());
      expect(
        credentialsAreValid({
          email: user.email,
          password: faker.internet.password(),
        })
      ).resolves.not.toThrow();
    });

    it("Returns false if email is undefined", async () => {
      expect(
        await credentialsAreValid({
          email: undefined,
          password: faker.internet.password(),
        })
      ).toBe(false);
    });

    it("Returns false if password is undefined", async () => {
      const user = await database.users.insert(test.mocks.user());
      expect(
        await credentialsAreValid({ email: user.email, password: undefined })
      ).toBe(false);
    });

    it("Returns false if there's no user with given email", async () => {
      const email = faker.internet.email();
      const user = await database.users.getByEmail(email);

      expect(
        await credentialsAreValid({
          email,
          password: faker.internet.password(),
        })
      ).toBe(false);

      expect(user).toEqual(null);
    });

    it("Returns false if the password is not the same as used when signing up", async () => {
      const user = await database.users.insert(test.mocks.user());

      expect(
        await credentialsAreValid({
          email: user.email,
          password: faker.internet.password(),
        })
      ).toBe(false);
    });

    it("returns true if the supplied password is correct", async () => {
      const password = faker.internet.password();
      const password_hash = await hash.hash(password);

      const user = await database.users.insert({
        ...test.mocks.user(),
        password_hash,
      });

      expect(user.password_hash).toEqual(password_hash);

      const valid = await credentialsAreValid({ email: user.email, password });
      expect(valid).toBe(true);
    });
  });

  describe("POST request for creating new users", () => {
    it("Does respond with BAD_REQUEST if no user is sent", async () => {
      const { status } = await signUp(null);

      expect(status).toEqual(BAD_REQUEST);
    });

    it("Does respond with BAD_REQUEST if password is undefined", async () => {
      const { status } = await signUp({
        ...test.mocks.credentials(),
        password: undefined,
      });
      expect(status).toEqual(BAD_REQUEST);
    });

    it("Does respond with BAD_REQUEST if email is undefined", async () => {
      const { status } = await signUp({
        ...test.mocks.credentials(),
        email: undefined,
      });

      expect(status).toEqual(BAD_REQUEST);
    });

    it("Does respond with BAD_REQUEST if email and password are both undefined", async () => {
      const { status } = await signUp({
        email: undefined,
        password: undefined,
      });

      expect(status).toEqual(BAD_REQUEST);
    });

    it("Redirects to front page if successful", async () => {
      const credentials = test.mocks.credentials();
      const { status } = await signUp(credentials);
      expect(status).toEqual(CREATED);
    });

    describe("Cookie behavior after signing up", () => {
      const setupCookieTestForSignup = async () => {
        const credentials = test.mocks.credentials();

        const { headers, status } = await signUp(credentials);

        const cookie = extractCookieByName(
          constants.TOKEN_COOKIE_HEADER(),
          headers
        );

        logger.debug({
          message:
            "getting cookie with header" + constants.TOKEN_COOKIE_HEADER(),
          cookie,
        });

        return {
          cookie,
          credentials,
        };
      };

      it("Sets a valid token as a cookie", async () => {
        const { cookie, credentials } = await setupCookieTestForSignup();

        const persistedUser = await database.users.getByEmail(
          credentials.email
        );
        const decodedUser = decode(cookie.value);

        expect(persistedUser).toEqual(decodedUser);
      });

      it("Cookie has httponly", async () => {
        const { cookie } = await setupCookieTestForSignup();
        expect(cookie.properties).toContain("HttpOnly");
      });

      it("Cookie has secure", async () => {
        const { cookie } = await setupCookieTestForSignup();
        expect(cookie.properties).toContain("Secure");
      });

      it("Cookie has SameSite", async () => {
        const { cookie } = await setupCookieTestForSignup();
        expect(cookie.properties).toContain("SameSite=Strict");
      });
    });

    it("Sets a valid token in body", async () => {
      const credentials = test.mocks.credentials();
      const {
        body: { token },
      } = await signUp(credentials);

      const persistedUser = await database.users.getByEmail(credentials.email);
      const decodedUser = decode(token);

      expect(persistedUser).toEqual(decodedUser);
    });

    it("Stores user with the lowercase version of their email adress", async () => {
      const email = `FlAkYcAsE${faker.internet.email()}`;
      await signUp({
        ...test.mocks.credentials(),
        email,
      });

      const withoutLowerCase = await database.users.getByEmail(email);
      const lowercase = await database.users.getByEmail(email.toLowerCase());

      expect(withoutLowerCase).toBeNull();
      expect(lowercase).toBeDefined();
      expect(lowercase.email).toEqual(email.toLowerCase());
    });

    it("Returns a token containing the correct user on signup", async () => {
      const credentials = test.mocks.credentials();
      const response = await signUp(credentials);

      const token = response.body.token;
      expect(response.body.token).toBeDefined();
      expect(response.body.token).not.toBeNull();
      //NOTE: assumes test JWT_SECRET secret is present and same when creating and reading here
      const parsed = jwt.decode<models.User>(token);
      expect(parsed.email).toEqual(credentials.email);
    });

    it("Results in a user being created if successful", async () => {
      const credentials = test.mocks.credentials();
      const before = await database.users.getByEmail(credentials.email);
      expect(before).toBeNull();

      const { status } = await signUp(credentials);
      expect(status).toEqual(CREATED);

      const after = await database.users.getByEmail(credentials.email);
      expect(after).toBeDefined();
    });

    it("Does create a user with correct email", async () => {
      const credentials = test.mocks.credentials();
      const { status } = await signUp(credentials);
      expect(status).toEqual(CREATED);

      const user = await database.users.getByEmail(credentials.email);
      expect(user.email).toEqual(credentials.email);
    });

    it("Does create a user with an id", async () => {
      const credentials = test.mocks.credentials();
      const { status } = await signUp(credentials);
      expect(status).toEqual(CREATED);
    });

    it("returns BAD_REQUEST on users that don't have valid email addresses", async () => {
      const { status } = await signUp({
        ...test.mocks.credentials(),
        email: "notemail.com",
      });

      expect(status).toEqual(BAD_REQUEST);
    });
  });

  describe("POST endpoint for creating new sessions", () => {
    it("Does respond with 201 on successful request", async () => {
      const credentials = test.mocks.credentials();
      await signUp(credentials);

      const { status } = await login(credentials);
      expect(status).toBe(CREATED);
    });

    it("Does respond with 401 if credentials are invalid", async () => {
      const credentials = test.mocks.credentials();
      //NOTE: not signing up

      const { status } = await login(credentials);
      expect(status).toBe(UNAUTHORIZED);
    });

    describe("Cookie behavior after creating new session", () => {
      const setupCookieTestForLogin = async () => {
        const credentials = test.mocks.credentials();

        await signUp(credentials);
        const { headers } = await login(credentials);

        const cookie = extractCookieByName(
          constants.TOKEN_COOKIE_HEADER(),
          headers
        );

        logger.debug({
          message:
            "getting cookie with header" + constants.TOKEN_COOKIE_HEADER(),
          cookie,
        });

        return {
          cookie,
          credentials,
        };
      };

      it("Sets a valid token as a cookie", async () => {
        const { cookie, credentials } = await setupCookieTestForLogin();

        const persistedUser = await database.users.getByEmail(
          credentials.email
        );
        const decodedUser = decode(cookie.value);

        expect(persistedUser).toEqual(decodedUser);
      });

      it("Cookie has httponly", async () => {
        const { cookie } = await setupCookieTestForLogin();
        expect(cookie.properties).toContain("HttpOnly");
      });

      it("Cookie has secure", async () => {
        const { cookie } = await setupCookieTestForLogin();
        expect(cookie.properties).toContain("Secure");
      });

      it("Cookie has SameSite", async () => {
        const { cookie } = await setupCookieTestForLogin();
        expect(cookie.properties).toContain("SameSite=Strict");
      });
    });
  });

  it("Does create a user, but does not store the password", async () => {
    const credentials = test.mocks.credentials();
    const { status } = await signUp(credentials);
    expect(status).toEqual(CREATED);

    const user = await database.users.getByEmail(credentials.email);
    expect(user.password_hash).not.toEqual(credentials.password);
  });

  it("Does create a user and stores hash comparable with bcrypt", async () => {
    const credentials = test.mocks.credentials();
    const { status } = await signUp(credentials);
    expect(status).toEqual(CREATED);

    const user = await database.users.getByEmail(credentials.email);
    expect(await hash.compare(credentials.password, user.password_hash)).toBe(
      true
    );
  });

  it("Responds with CONFLICT if attempting to create the same user twice", async () => {
    const credentials = test.mocks.credentials();
    const firstResponse = await signUp(credentials);
    expect(firstResponse.status).toEqual(CREATED);

    const secondResponse = await signUp(credentials);
    expect(secondResponse.status).toEqual(CONFLICT);
  });

  it("Returns BAD_REQUEST on users that have passwords shorter than 8 characters", async () => {
    const { status } = await signUp({
      ...test.mocks.credentials(),
      password: faker.random.alphaNumeric(7),
    });

    expect(status).toEqual(BAD_REQUEST);
  });

  it("returns BAD_REQUEST on users that have passwords without lowercase letters", async () => {
    const { status } = await signUp({
      ...test.mocks.credentials(),
      password: faker.random.alphaNumeric(80).toLowerCase(),
    });

    expect(status).toEqual(BAD_REQUEST);
  });

  it("returns BAD_REQUEST on users that have passwords without uppercase letters", async () => {
    const { status } = await signUp({
      ...test.mocks.credentials(),
      password: faker.random.alphaNumeric(80).toUpperCase(),
    });

    expect(status).toEqual(BAD_REQUEST);
  });

  it("returns BAD_REQUEST on users that don't have numbers", async () => {
    const { status } = await signUp({
      ...test.mocks.credentials(),
      password: faker.random.alpha({ count: 50 }),
    });

    expect(status).toEqual(BAD_REQUEST);
  });
});

describe("GET endpoint for retrieving information about the logged in user", () => {
  const getMe = (token: string, agent = supertest(app)) =>
    agent.get("/users/me").set("Authorization", "Bearer " + token);

  it("Responds with UNAUTHORIZED if the user is not logged in", async () => {
    const { status } = await getMe(null);
    expect(status).toEqual(UNAUTHORIZED);
  });

  it("Resopnds with FORBIDDEN if the JWT token is present, but not valid", async () => {
    //a token from jwt.io, not encrypted with the same secret
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    const { status } = await getMe(token);
    expect(status).toEqual(FORBIDDEN);
  });

  it("Responds with OK if the user is logged in", async () => {
    const { status } = await getMe(await extractBearerToken(signUp()));

    expect(status).toEqual(OK);
  });

  it("Returns the user object if the user is logged in", async () => {
    const token = await extractBearerToken(signUp());
    const { body } = await getMe(token).expect(OK);

    expect(body.email).toBeDefined();
    expect(body.id).toBeDefined();
  });

  it("Does not return the password hash to client", async () => {
    expect(
      (await getMe(await extractBearerToken(signUp()))).body.password_hash
    ).toBeUndefined();
  });

  it("Does return user data for the correct user", async () => {
    const credentials = test.mocks.credentials();

    const { body, status } = await getMe(
      await extractBearerToken(signUp(credentials))
    );

    expect(status).toEqual(OK);
    expect(body.email).toEqual(credentials.email);
  });

  it("Responds with FORBIDDEN if there is a token, but it's not properly formatted", async () => {
    const { status } = await getMe("badly formatted token");
    expect(status).toEqual(FORBIDDEN);
  });

  it("Responds with OK if user is logged in", async () => {
    const token = await extractBearerToken(signUp());

    const { status } = await getMe(token);
    expect(status).toEqual(OK);
  });
});

describe("PUT endpont for token refresh", () => {
  const refreshToken = (oldToken: string, agent = supertest(app)) =>
    agent
      .put("/users/sessions")
      .set("Authorization", "Bearer " + oldToken)
      .withCredentials();

  it("Responds with OK on valid request", async () => {
    const token = await extractBearerToken(signUp());
    const { status } = await refreshToken(token);

    expect(status).toEqual(OK);
  });

  it("Responds with a different token on valid request", async () => {
    const oldToken = await extractBearerToken(signUp());

    await test.sleep(1200); //to update JWT `.iat`
    const response = await refreshToken(oldToken);
    const newToken = response.body.token;

    expect(oldToken).toBeDefined();
    expect(newToken).toBeDefined();
    expect(oldToken).not.toEqual(newToken);
  });

  describe("Cookie behavior after refreshing session", () => {
    const setupCookieTestForRefreshing = async () => {
      const credentials = test.mocks.credentials();
      const agent = supertest.agent(app);
      const oldToken = await extractBearerToken(signUp(credentials));
      const { headers } = await refreshToken(oldToken, agent);

      const cookie = extractCookieByName(
        constants.TOKEN_COOKIE_HEADER(),
        headers
      );

      return {
        cookie,
        credentials,
      };
    };

    it("Sets a valid token as a cookie", async () => {
      const { cookie, credentials } = await setupCookieTestForRefreshing();

      const persistedUser = await database.users.getByEmail(credentials.email);
      const decodedUser = decode(cookie.value);

      expect(persistedUser).toEqual(decodedUser);
    });

    it("Cookie has httponly", async () => {
      const { cookie } = await setupCookieTestForRefreshing();
      expect(cookie.properties).toContain("HttpOnly");
    });

    it("Cookie has secure", async () => {
      const { cookie } = await setupCookieTestForRefreshing();
      expect(cookie.properties).toContain("Secure");
    });

    // FIXME: skipped - fails due to too many db connections
    it.skip("Cookie has SameSite", async () => {
      const { cookie } = await setupCookieTestForRefreshing();
      expect(cookie.properties).toContain("SameSite=Strict");
    });
  });
});
