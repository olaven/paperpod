import { withConfiguration, run } from "klart";

const { NODE_ENV, DATABASE_CA, PAPERPOD_SCHEMA } = process.env;
const configuration =
  NODE_ENV === "production"
    ? {
        ssl: {
          ca: DATABASE_CA,
          rejectUnauthorized: false,
        },
      }
    : {};

const setSchema = (schema: string) =>
  run(`SET search_path TO ${schema}`).then(() => {
    console.log(`set search path to ${schema}`);
  });

export const database = async () => {
  if (!PAPERPOD_SCHEMA) throw `Schema not set: ${PAPERPOD_SCHEMA}`;

  await setSchema(PAPERPOD_SCHEMA);
  return withConfiguration(configuration);
};
