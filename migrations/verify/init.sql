-- Verify kapouevent:init on pg

BEGIN;

SELECT id FROM job WHERE false;
SELECT id FROM "user" WHERE false;
SELECT id FROM user_has_job WHERE false;
SELECT id FROM address WHERE false;
SELECT id FROM vehicle WHERE false;
SELECT id FROM event WHERE false;
SELECT id FROM phase WHERE false;
SELECT id FROM phase_has_user WHERE false;
SELECT id FROM phase_has_vehicle WHERE false;

ROLLBACK;
