import { withConfiguration } from "klart";

/**
 * The database CA is assumed to be stored encoded
 * as base64. This gets `DATABASE_CA` from env and
 * decodes it.
 * @returns decoded certificate
 */
export const getCertificate = () => {
  const certificate = Buffer.from(process.env.DATABASE_CA, "base64")
    .toString("utf-8")
    .trim();
  console.log("returning certificate", certificate);
  return certificate;
};

/**
 * @returns env-dependent db configuration
 */
export const getConfiguration = () =>
  process.env.NODE_ENV === "production"
    ? {
        ssl: {
          ca: getCertificate(),
          rejectUnauthorized: false,
        },
      }
    : {};

const setSchema = (schema: string) =>
  withConfiguration(getConfiguration())
    .run(`SET search_path TO ${schema}`)
    .then(() => {
      console.log(`set search path to ${schema}`);
    });

export const database = async () => {
  console.log(`Inside database function`);
  const { PAPERPOD_SCHEMA } = process.env;
  console.log(`got schema from env: ${PAPERPOD_SCHEMA}`);
  if (!PAPERPOD_SCHEMA)
    throw `Schema needs to be defined in env: ${PAPERPOD_SCHEMA}`;

  console.log(`Going to set that schema`);
  await setSchema(PAPERPOD_SCHEMA);
  console.log(`Succeeded at setting schema ${PAPERPOD_SCHEMA}`);
  console.log(`Going to get configuration for env ${process.env.NODE_ENV}`);
  const configuration = getConfiguration();
  console.log(
    `Returning database with configuration ${JSON.stringify(configuration)}`
  );
  return withConfiguration(configuration);
};
