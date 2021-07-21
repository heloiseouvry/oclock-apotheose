-- Revert kapouevent:phase-fix-no-vehicle from pg

BEGIN;

ALTER TABLE phase ALTER COLUMN vehicle_id SET NOT NULL;

COMMIT;
