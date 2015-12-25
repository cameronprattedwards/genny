USE genny;

BEGIN;

INSERT INTO migrations (id, description, action) VALUES (14, 'Add failureMessage column to Step_commit', 'ALTER');

ALTER TABLE Step_commit ADD failureMessage TEXT;

COMMIT;
