-- Deploy kapouevent:delete_cascade to pg

BEGIN;

ALTER TABLE phase_has_user 
  DROP CONSTRAINT phase_has_user_phase_id_fkey,
  ADD CONSTRAINT phase_has_user_phase_id_fkey
    FOREIGN KEY (phase_id)
    REFERENCES phase(id)
    ON DELETE CASCADE;

COMMIT;
