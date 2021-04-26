/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
        create extension IF NOT EXISTS "uuid-ossp" SCHEMA "public";
        CREATE TABLE IF NOT EXISTS articles (
            id uuid DEFAULT public.uuid_generate_v4() PRIMARY KEY, 
            owner_id uuid, 
            original_url varchar(500), 
            title varchar(200), 
            description varchar(1500),
            author varchar(400),
            text varchar(50000), 
            publication_time timestamptz, 
            added_time timestamptz, 
            storage_uri varchar(200)
        ); 
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {}
