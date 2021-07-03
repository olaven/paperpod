import faker from "faker";
import { test } from "@paperpod/common";
import { getCertificate, getConfiguration } from "./configuration";

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
      test.withMockedNodeEnv("test", () => {
        expect(() => getConfiguration()).not.toThrow();
      })
    );

    it(
      "Returns an empty object if in test",
      test.withMockedNodeEnv("test", () => {
        expect(getConfiguration()).toEqual({});
      })
    );

    it(
      "Returns an empty object if in development",
      test.withMockedNodeEnv("development", () => {
        expect(getConfiguration()).toEqual({});
      })
    );

    describe("Getting configuration in production", () => {
      it(
        "Returns an object with .ssl key",
        test.withMockedNodeEnv(
          "production",
          withMockedCertificate((_, __) => {
            expect(getConfiguration().ssl).toBeDefined();
          })
        )
      );

      it(
        "Returns SSL with certificate",
        test.withMockedNodeEnv(
          "production",
          withMockedCertificate((certificate, encoded) => {
            const { ca: retrieved } = getConfiguration().ssl;
            expect(retrieved).toEqual(certificate);
          })
        )
      );

      it(
        "Returns SSL with rejectUnauthorized: false",
        test.withMockedNodeEnv(
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
