-- Deploy kapouevent:user-int-to-text to pg

BEGIN;

ALTER TABLE public."user" 
  ALTER COLUMN birth_department TYPE text,
  ALTER COLUMN intermittent_registration TYPE text;

COMMIT;
