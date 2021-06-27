-- initial migration 
CREATE SCHEMA IF NOT EXISTS authentication;
CREATE extension IF NOT EXISTS "uuid-ossp" SCHEMA "public";
CREATE TABLE IF NOT EXISTS authentication.users(
    id uuid DEFAULT public.uuid_generate_v4() PRIMARY KEY, 
    email varchar(300), 
    password_hash varchar(1000)
);

-- adding user subscribing true or false 
CREATE TYPE IF NOT EXISTS Subscription AS ENUM ('active', 'inactive'); 
ALTER TABLE authentication.users
ADD COLUMN IF NOT EXISTS subscription Subscription NOT NULL DEFAULT 'inactive'; 

