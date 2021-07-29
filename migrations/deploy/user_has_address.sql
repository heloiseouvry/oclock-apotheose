-- Deploy kapouevent:user_has_address to pg

BEGIN;

ALTER TABLE "user"
  ADD COLUMN address_id int REFERENCES address(id) ON DELETE CASCADE;

COMMIT;
