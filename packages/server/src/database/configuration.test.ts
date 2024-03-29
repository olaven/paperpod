import faker from "faker";
import { getCertificate, getConfiguration } from "./configuration";

//TODO: share in a way with configuration.ts
//cannot be used in common export because it breaks in
// frontend modules
// `Cannot assign to 'NODE_ENV' because it is a read-only property.`
export const withMockedNodeEnv =
  (value: "production" | "dev" | "test", action: () => void) => () => {
    const previous = process.env.NODE_ENV;
    process.env.NODE_ENV = value;
    action();
    process.env.NODE_ENV = previous;
  };

const withMockedCertificate =
  (action: (certificate: string, encoded: string) => void) => () => {
    const certificate = `
      -----BEGIN CERTIFICATE-----
      ${faker.random.alpha({ count: 200 })}
      -----END CERTIFICATE-----
    `.trim();

    const encoded = Buffer.from(certificate).toString("base64");

    //TODO: figure out some neat abstraction on this -> reuse in this and `withMockedNodeEnv`
    const previous = process.env.DATABASE_CA;
    process.env.DATABASE_CA = encoded;
    action(certificate, encoded);
    process.env.DATABASE_CA = previous;
  };

describe("Database configuration module", () => {
  describe("Getting database configuration", () => {
    it(
      "Does not throw an error",
      withMockedNodeEnv("test", () => {
        expect(() => getConfiguration()).not.toThrow();
      })
    );

    it(
      "Returns an empty object if in test",
      withMockedNodeEnv("test", () => {
        expect(getConfiguration()).toEqual({});
      })
    );

    it(
      "Returns an empty object if in development",
      withMockedNodeEnv("dev", () => {
        expect(getConfiguration()).toEqual({});
      })
    );

    describe("Getting configuration in production", () => {
      it(
        "Returns an object with .ssl key",
        withMockedNodeEnv(
          "production",
          withMockedCertificate((_, __) => {
            expect(getConfiguration().ssl).toBeDefined();
          })
        )
      );

      it(
        "Returns SSL with certificate",
        withMockedNodeEnv(
          "production",
          withMockedCertificate((certificate, encoded) => {
            const { ca: retrieved } = getConfiguration().ssl;
            expect(retrieved).toEqual(certificate);
          })
        )
      );

      it(
        "Returns SSL with rejectUnauthorized: false",
        withMockedNodeEnv(
          "production",
          withMockedCertificate((_, __) => {
            const { rejectUnauthorized } = getConfiguration().ssl;
            expect(rejectUnauthorized).toBe(false);
          })
        )
      );
    });
  });

  describe("Decoding of certificate", () => {
    it(
      "does retrieve the certificate",
      withMockedCertificate((certificate, encoded) => {
        const retrieved = getCertificate();
        expect(retrieved).toEqual(certificate);
      })
    );

    it(
      "does not have equal certificate and encoded value",
      withMockedCertificate((certificate, encoded) => {
        expect(certificate).not.toEqual(encoded);
        expect(getCertificate()).not.toEqual(encoded);
      })
    );

    it(
      "gives a certificate based on the encoded value",
      withMockedCertificate((certificate, encoded) => {
        const decoded = Buffer.from(encoded, "base64").toString();
        expect(certificate).toEqual(decoded);
      })
    );
  });
});
