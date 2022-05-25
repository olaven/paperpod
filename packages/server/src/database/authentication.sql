-- initial migration 
CREATE SCHEMA IF NOT EXISTS authentication;
CREATE extension IF NOT EXISTS "uuid-ossp" SCHEMA "public";
CREATE TABLE IF NOT EXISTS authentication.users(
    id uuid DEFAULT public.uuid_generate_v4() PRIMARY KEY, 
    email varchar(300), 
    password_hash varchar(1000)
);

-- adding user subscribing true or false 
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_type WHERE typname = 'subscription') THEN
        CREATE TYPE Subscription AS ENUM ('active', 'inactive'); 
    END IF;
END
$$;

ALTER TABLE authentication.users
    ADD COLUMN IF NOT EXISTS subscription Subscription NOT NULL DEFAULT 'inactive'; 

ALTER TABLE authentication.users
    ADD COLUMN IF NOT EXISTS subscription_id text DEFAULT null; 

-- email has to be unique to avoid race conditions creating multiple users
-- if the constraint does not exist, add it
DO $$
BEGIN
	IF NOT EXISTS (
		SELECT constraint_name 
		FROM information_schema.constraint_column_usage
		WHERE 
			constraint_name = 'email_is_unique' AND 
			table_name = 'users'
	) THEN 
		ALTER TABLE authentication.users
	    ADD CONSTRAINT email_is_unique UNIQUE (email);
	END IF;
END
$$;