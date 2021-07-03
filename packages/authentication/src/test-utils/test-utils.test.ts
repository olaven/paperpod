import faker from "faker";
import { constants } from "../../../common/src";
import { extractCookieByName } from "./test-utils";
describe("Cookie extraction", () => {
  const headers = {
    withTokenCookie: (token = faker.datatype.uuid()) => ({
      "set-cookie": [
        `${constants.TOKEN_COOKIE_HEADER}=${token}; Max-Age=600; Path=/; Expires=Sat, 03 Jul 2021 12:59:08 GMT; HttpOnly; SameSite=Strict`,
      ],
    }),
    withNoCookie: () => ({
      "set-cookie": undefined,
    }),
  };

  it("Does return the correct token value", () => {
    const token = faker.datatype.uuid();
    const actual = extractCookieByName(
      constants.TOKEN_COOKIE_HEADER,
      headers.withTokenCookie(token)
    );

    expect(actual.value).toEqual(token);
  });
});
