/**
 * The database CA is assumed to be stored encoded
 * as base64. This gets `DATABASE_CA` from env and
 * decodes it.
 * @returns decoded certificate
 */
export const getCertificate = () =>
  Buffer.from(process.env.DATABASE_CA, "base64").toString("utf-8").trim();

export type Configuration = {
  ssl?: {
    ca: string;
    rejectUnauthorized: false;
  };
};

/**
 * @returns env-dependent db configuration
 */
export const getConfiguration = () => ({})
  /* 
  FIXME: adapt if not needed with DO app spec 
  process.env.NODE_ENV === "production"
    ? {
        ssl: {
          ca: getCertificate(),
          rejectUnauthorized: false,
        },
      }
    : {};
 */
