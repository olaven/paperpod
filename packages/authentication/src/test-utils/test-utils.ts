export const stripeResource = <T>(resources: T[]) => ({
  data: resources.map((resource) => ({
    ...resource,
    metadata: {
      collection: "paperpod",
    },
  })),
});

/**
 * NOTE:
 * Adapted from: https://gist.github.com/the-vampiire/a564af41ed0ce8eb7c30dbe6c0f627d8
 * Thanks.
 */
const extractCookies = (
  headers: object
): {
  name: string;
  value: string;
  properties: string[];
}[] => {
  console.log("getting set-cookie", headers["set-cookie"]);
  const cookies = headers["set-cookie"] as string[];
  if (!cookies) throw "no cookies defined";

  return cookies.map((cookie) => {
    const [name, ...rest] = cookie.split("=");
    const parts = rest.join("=").split("; ");

    const [value, ...properties] = parts;

    return { name, value, properties };
  });
};

export const extractCookieByName = (name: string, headers: object) =>
  extractCookies(headers).find((cookie) => cookie.name === name);
