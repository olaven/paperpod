CREATE SCHEMA IF NOT EXISTS api;
CREATE extension IF NOT EXISTS "uuid-ossp" SCHEMA "public";
CREATE TABLE IF NOT EXISTS api.articles (
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