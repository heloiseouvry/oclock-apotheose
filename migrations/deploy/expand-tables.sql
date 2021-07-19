-- Deploy kapouevent:expand-tables to pg

BEGIN;

CREATE DOMAIN email_type AS TEXT CHECK(
  VALUE ~ '(?:[a-z0-9!#$%&''*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'
); -- RFC 5322 Official Standard Email Regex

CREATE DOMAIN social_security_number_fr AS TEXT CHECK(VALUE ~ '^([1-4]|[7-8])([\s.-]?)(\d{2})([\s.-]?)(0[1-9]|1[0-2]|[2-3][0-9]|4[0-2]|[5-9][0-9])([\s.-]?)(0[1-9]|[1-9][0-9]|2[a-bA-B])([\s.-]?)((?!000)(\d{3})([\s.-]?)){2}(0[1-9]|[1-8][0-9]|9[0-7])$');

CREATE DOMAIN siret_number AS TEXT CHECK(VALUE ~ '^(\d[\s.-]?){14}$');

CREATE DOMAIN hexa_color AS TEXT CHECK(VALUE ~ '^#([\da-fA-F]{3}){1,2}$');

ALTER TABLE "user"
  ADD COLUMN email email_type NOT NULL,
  ADD COLUMN password TEXT NOT NULL,
  ADD COLUMN status TEXT,
  ADD COLUMN birth_date DATE,
  ADD COLUMN birth_city TEXT,
  ADD COLUMN birth_department INT,
  ADD COLUMN ssn social_security_number_fr,
  ADD COLUMN intermittent_registration INT,
  ADD COLUMN legal_entity TEXT,
  ADD COLUMN siret siret_number,
  ADD COLUMN emergency_contact TEXT,
  ADD COLUMN emergency_phone_number phone_number_fr,
  ADD COLUMN comments TEXT;

ALTER TABLE event
  ADD COLUMN color hexa_color DEFAULT '#ffffff';

COMMIT;
