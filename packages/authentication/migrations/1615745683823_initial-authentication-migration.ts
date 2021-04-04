/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
        create extension IF NOT EXISTS "uuid-ossp" SCHEMA "public";
        CREATE TABLE IF NOT EXISTS users(
            id uuid DEFAULT public.uuid_generate_v4() PRIMARY KEY, 
            email varchar(300), 
            password_hash varchar(1000)
        );
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {}
