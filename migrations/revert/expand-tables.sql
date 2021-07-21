-- Revert kapouevent:expand-tables from pg

BEGIN;

ALTER TABLE "user"
  DROP COLUMN email,
  DROP COLUMN password,
  DROP COLUMN status,
  DROP COLUMN birth_date,
  DROP COLUMN birth_city,
  DROP COLUMN birth_department,
  DROP COLUMN ssn,
  DROP COLUMN intermittent_registration,
  DROP COLUMN legal_entity,
  DROP COLUMN siret,
  DROP COLUMN emergency_contact,
  DROP COLUMN emergency_phone_number,
  DROP COLUMN comments;

ALTER TABLE event
  DROP COLUMN color;

DROP DOMAIN email_type;
DROP DOMAIN social_security_number_fr;
DROP DOMAIN siret_number;
DROP DOMAIN hexa_color;

COMMIT;
