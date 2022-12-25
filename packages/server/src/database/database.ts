import { logger } from "@paperpod/common";
import { withConfiguration } from "klart";
import { getConfiguration } from "./configuration";
import { SchemaName, validSchemaNames } from "./migrate";

export const database = async () => {
  const schema = process.env.PAPERPOD_SCHEMA as SchemaName;
  if (!schema) throw `Schema needs to be defined in env: ${schema}`;
  if (!validSchemaNames.includes(schema)) {
    throw `Schema ${schema} not one of ${validSchemaNames}`
  }

  const configuration = getConfiguration();
  logger.trace({
    message: "Got configuration",
    configuration,
  });

  return withConfiguration(configuration);
};
