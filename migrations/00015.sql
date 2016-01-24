USE genny;

BEGIN;

INSERT INTO migrations (id, description, action) VALUES (15, 'Change failureMessage to error', 'ALTER');

ALTER TABLE Step_commit CHANGE COLUMN `failureMessage` `error` TEXT;

COMMIT;
