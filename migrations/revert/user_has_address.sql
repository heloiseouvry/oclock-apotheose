-- Revert kapouevent:user_has_address from pg

BEGIN;

ALTER TABLE "user"
  DROP COLUMN address_id;

COMMIT;
