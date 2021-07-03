/**
 * The database CA is assumed to be stored encoded
 * as base64. This gets `DATABASE_CA` from env and
 * decodes it.
 * @returns decoded certificate
 */
export const getCertificate = () =>
  Buffer.from(process.env.DATABASE_CA, "base64").toString("utf-8").trim();

export type Configuration = {
  max: number;
  ssl?: {
    ca: string;
    rejectUnauthorized: false;
  };
};

/**
 * @returns env-dependent db configuration
 */
export const getConfiguration = (): Configuration =>
  process.env.NODE_ENV === "production"
    ? {
        max: 20,
        ssl: {
          ca: getCertificate(),
          rejectUnauthorized: false,
        },
      }
    : {
        max: 20,
      };
