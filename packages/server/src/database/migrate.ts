import fs from "fs";
import path from "path";
import { withConfiguration } from "klart";
import { Configuration } from "./configuration";
import { logger } from "@paperpod/common";

export const readMigrationFile = async (schema: SchemaName) => {
  const filepath = path.resolve(__dirname, `${schema}.sql`);
  const buffer = fs.readFileSync(filepath);
  return Buffer.from(buffer).toString("utf-8");
};

export type SchemaName = "api" | "authentication";

/**
 * Runs database migrations.
 * DANGER: this is a costly operation that should only run on server startup.
 * Prefer using `bootWithMigrations` instead of calling this function directly.
 *
 * This is exported for use in tests only.
 */
export const migrate = async (options: {
  configuration: Configuration;
  schema: SchemaName;
}) => {
  const sql = await readMigrationFile(options.schema);
  logger.trace({
    message: "Going to run migration with",
    sql,
  });

  try {
    await withConfiguration(options.configuration).run(sql);
  } catch (error) {
    logger.error({ message: `Error when running migration`, error });
  }
};
