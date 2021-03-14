/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 
        CREATE TABLE IF NOT EXISTS articles (
            id uuid DEFAULT uuid_generate_v4(), 
            owner_id uuid, 
            original_url varchar(500), 
            title varchar(200), 
            description varchar(1500),
            author varchar(400),
            text varchar(50000), 
            publication_timestamp timestamptz, 
            added_timestamp timestamptz, 
            storage_uri varchar(200)
        ); 
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {}
