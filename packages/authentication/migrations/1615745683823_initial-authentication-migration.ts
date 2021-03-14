/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 
        CREATE TABLE IF NOT EXISTS users(
            id uuid DEFAULT uuid_generate_v4(), 
            email varchar(300), 
            password_hash varchar(1000)
        );
    `)
}

export async function down(pgm: MigrationBuilder): Promise<void> {
}
