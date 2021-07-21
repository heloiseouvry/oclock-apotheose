-- Revert kapouevent:user-int-to-text from pg

BEGIN;

ALTER TABLE public."user" 
  ALTER COLUMN birth_department TYPE int USING birth_department::integer,
  ALTER COLUMN intermittent_registration TYPE int USING intermittent_registration::integer;

COMMIT;
