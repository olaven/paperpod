import { withConfiguration, run } from "klart";

const { NODE_ENV, DATABASE_CA, PAPERPOD_SCHEMA } = process.env;

const getCertificate = () => {
  const certificate = Buffer.from(DATABASE_CA).toString("base64");
  console.log("returning certificate", certificate);
  return certificate;
};

const configuration =
  NODE_ENV === "production"
    ? {
        ssl: {
          ca: getCertificate(),
          rejectUnauthorized: false,
        },
      }
    : {};

console.log(
  `using configuration: ${JSON.stringify(configuration)} with env ${NODE_ENV}`
);

const setSchema = (schema: string) =>
  run(`SET search_path TO ${schema}`).then(() => {
    console.log(`set search path to ${schema}`);
  });

export const database = async () => {
  if (!PAPERPOD_SCHEMA) throw `Schema not set: ${PAPERPOD_SCHEMA}`;

  await setSchema(PAPERPOD_SCHEMA);
  return withConfiguration(configuration);
};
