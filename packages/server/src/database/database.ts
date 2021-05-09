import { withConfiguration } from "klart";
import { getConfiguration } from "./configuration";
import { ensureMigrated, SchemaName } from "./migrate";

/* const setSchema = (schema: SchemaName) =>
  withConfiguration(getConfiguration())
    .run(`SET search_path TO ${schema}`)
    .then(() => {
      console.log(`set search path to ${schema}`);
    }); */

export const database = async () => {
  const PAPERPOD_SCHEMA = process.env.PAPERPOD_SCHEMA as SchemaName;
  if (!PAPERPOD_SCHEMA)
    throw `Schema needs to be defined in env: ${PAPERPOD_SCHEMA}`;

  const configuration = getConfiguration();
  await ensureMigrated({ configuration, schema: PAPERPOD_SCHEMA });

  return withConfiguration(configuration);
};
