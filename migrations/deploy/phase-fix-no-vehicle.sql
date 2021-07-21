-- Deploy kapouevent:phase-fix-no-vehicle to pg

BEGIN;

ALTER TABLE phase ALTER COLUMN vehicle_id DROP NOT NULL;

COMMIT;
