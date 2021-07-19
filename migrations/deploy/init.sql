-- Deploy kapouevent:init to pg

BEGIN;

CREATE DOMAIN posint AS int CHECK (value >= 0);

CREATE DOMAIN zipcode AS text CHECK(
  -- règle générale
  VALUE ~ '^(?!00|96|99)\d{5}$'
  AND
  -- exception générale
  (VALUE !~ '[12]80$' OR VALUE='34280' OR VALUE='58180')
  AND
  -- Corse
  (VALUE !~ '^20[0457-9]' OR VALUE='20000')
);

CREATE DOMAIN licence_plate_eu AS TEXT CHECK(VALUE ~ '^(?!WW|SS)[A-HJ-NP-T-VZ]{2}-\d{3}-(?!SS)[A-HJ-NP-T-VZ]{2}$');

CREATE DOMAIN phone_number_fr AS TEXT CHECK(VALUE ~ '^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$');

CREATE TABLE job (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  type text NOT NULL
);

CREATE TABLE "user" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  lastname text NOT NULL,
  firstname text NOT NULL,
  phone_number phone_number_fr,
  role text NOT NULL
);

CREATE TABLE user_has_job (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  job_id int NOT NULL REFERENCES job(id),
  user_id int NOT NULL REFERENCES "user"(id)
);

CREATE TABLE address (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  main text not null,
  additional text,
  zip_code zipcode NOT NULL,
  city text NOT NULL
);

CREATE TABLE vehicle (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  vehicle_plate licence_plate_eu NOT NULL,
  brand text,
  model text,
  volume posint,
  comments text
);

CREATE TABLE event (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text NOT NULL,
  start_date timestamptz NOT NULL,
  duration interval NOT NULL,
  user_id int NOT NULL REFERENCES "user"(id),
  address_id int NOT NULL REFERENCES address(id)
);

CREATE TABLE phase (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text NOT NULL,
  start_date timestamptz NOT NULL,
  duration interval NOT NULL,
  type text NOT NULL,
  internal_location text,
  tech_manager_contact text,
  provider_contact text,
  number_fee posint NOT NULL,
  comments text,
  event_id int NOT NULL REFERENCES event(id),
  vehicle_id int NOT NULL REFERENCES vehicle(id),
  user_id int NOT NULL REFERENCES "user"(id)
);

CREATE TABLE phase_has_user (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id int NOT NULL REFERENCES "user"(id),
  phase_id int NOT NULL REFERENCES phase(id),
  salary posint NOT NULL
);

CREATE TABLE phase_has_vehicle (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  phase_id int NOT NULL REFERENCES phase(id),
  vehicle_id int NOT NULL REFERENCES vehicle(id)
);

COMMIT;
