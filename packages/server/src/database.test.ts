import faker from "faker";
import { getCertificate } from "./database";

describe("Database module", () => {
  describe("Decoding of certificate", () => {
    const withMockedCertificate = (
      action: (certificate: string, encoded: string) => void
    ) => () => {
      const certificate = `
      -----BEGIN CERTIFICATE-----
      ${faker.random.alpha({ count: 200 })}
      -----END CERTIFICATE-----`;

      const encoded = Buffer.from(certificate).toString("base64");

      process.env.DATABASE_CA = encoded;
      action(certificate, encoded);
    };

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
