import fs from "fs";
import path from "path";
import { withConfiguration } from "klart";
import { Configuration } from "./configuration";
import { logger } from "../../../common/src";

//TODO: move to general util?
export const singleton = <T, G>(action: (input?: G) => T) => {
  let executed = false;
  return (first: G) => {
    if (executed) return;
    executed = true;
    return action(first);
  };
};

export const readMigrationFile = async (schema: SchemaName) => {
  const filepath = path.resolve(__dirname, `${schema}.sql`);
  const buffer = fs.readFileSync(filepath);
  return Buffer.from(buffer).toString("utf-8");
};

export type SchemaName = "api" | "authentication";

/**
 * Runs migration.
 * Is singleton, and will only run once.
 *
 * Requires
 * 1. migrations written with in file name matching schema.
 * 2. migrations being entirely idempotent.
 */
export const ensureMigrated = singleton(
  async (options: { configuration: Configuration; schema: SchemaName }) => {
    const sql = await readMigrationFile(options.schema);
    try {
      await withConfiguration(options.configuration).run(sql);
    } catch (error) {
      logger.error({ message: `Error when running migration`, error });
    }
  }
);
