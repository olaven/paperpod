import { withConfiguration } from "klart";
import { getConfiguration } from "./configuration";
import { ensureMigrated, SchemaName } from "./migrate";

export const database = async () => {
  const schema = process.env.PAPERPOD_SCHEMA as SchemaName;
  if (!schema) throw `Schema needs to be defined in env: ${schema}`;

  const configuration = getConfiguration();
  await ensureMigrated({ configuration, schema });

  return withConfiguration(configuration);
};
