import { sign } from "../jwt/jwt";
import faker from "faker";
import { models } from "@paperpod/common";
import { withAuthentication } from "./withAuthentication";
import { mocks } from "@paperpod/common/src/test/test";

describe("Authetnication verifying that caller is authenticated", () => {
  const useWithToken = (
    token: string,
    handler: (
      request: Express.Request,
      response: Express.Response,
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
});
