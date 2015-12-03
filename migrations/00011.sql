USE genny;

BEGIN;

INSERT INTO migrations (id, description, action) VALUES (11, 'Delete steps 1 and 2', 'INSERT');

ALTER TABLE Step_delete CHANGE COLUMN `createdAt` `deletedAt` BIGINT NOT NULL;

INSERT INTO Step_delete (Step_id, deletedAt) VALUES (1, 1449094055607), (2, 1449094055607);

COMMIT;
