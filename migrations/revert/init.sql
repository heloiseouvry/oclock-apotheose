-- Revert kapouevent:init from pg

BEGIN;

DROP TABLE phase_has_vehicle;
DROP TABLE phase_has_user;
DROP TABLE phase;
DROP TABLE event;
DROP TABLE vehicle;
DROP TABLE address;
DROP TABLE user_has_job;
DROP TABLE "user";
DROP TABLE job;
DROP DOMAIN posint;
DROP DOMAIN zipcode;
DROP DOMAIN licence_plate_eu;
DROP DOMAIN phone_number_fr;

COMMIT;
