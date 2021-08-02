-- Deploy kapouevent:end_date to pg

BEGIN;

ALTER TABLE event ADD COLUMN end_date timestamptz;
ALTER TABLE event DROP COLUMN duration;
ALTER TABLE phase ADD COLUMN end_date timestamptz;
ALTER TABLE phase DROP COLUMN duration;

COMMIT;
