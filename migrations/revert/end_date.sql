-- Revert kapouevent:end_date from pg

BEGIN;

ALTER TABLE event ADD COLUMN duration interval;
ALTER TABLE event DROP COLUMN end_date;
ALTER TABLE phase ADD COLUMN duration interval;
ALTER TABLE phase DROP COLUMN end_date;

COMMIT;
