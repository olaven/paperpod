import { logger } from "@paperpod/common";
import fs from "fs";
import { withConfiguration } from "klart";
import path from "path";
import { Configuration } from "./configuration";

export const readMigrationFile = async (schema: SchemaName) => {
  const filepath = path.resolve(__dirname, `${schema}.sql`);
  const buffer = fs.readFileSync(filepath);
  return Buffer.from(buffer).toString("utf-8");
};

export const validSchemaNames = ["api", "authentication"] as const; 
export type SchemaName = typeof validSchemaNames[number];

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
  logger.trace({message: "Starting migrate function", ...options})
  const sql = await readMigrationFile(options.schema);
  logger.trace({message: "Got SQL", sql}) 
  logger.trace({
    message: "Going to run migration with",
    sql,
  });

  try {
    await withConfiguration(options.configuration).run(sql);
    logger.trace({message: "Done running migrations without error"})
  } catch (error) {
    logger.info({message: "DB PORT", port: process.env.PGPORT});
    logger.error({ message: `Error when running migration`, error });
  }
};
