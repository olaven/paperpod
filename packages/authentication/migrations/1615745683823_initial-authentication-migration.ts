exports.up = (pgm) => {
  pgm.sql(`
        create extension IF NOT EXISTS "uuid-ossp" SCHEMA "public";
        CREATE TABLE IF NOT EXISTS users(
            id uuid DEFAULT public.uuid_generate_v4() PRIMARY KEY, 
            email varchar(300), 
            password_hash varchar(1000)
        );
    `);
};
