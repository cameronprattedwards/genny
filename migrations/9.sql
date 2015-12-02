USE genny;

BEGIN;

INSERT INTO migrations (id, description, action) VALUES (9, 'Rename directoryName to branchName', 'ALTER');

RENAME TABLE Step_directoryName_update TO Step_branchName_update;

ALTER TABLE Step_directoryName_update CHANGE COLUMN `directoryName` `branchName` VARCHAR(255) NOT NULL;

COMMIT;
