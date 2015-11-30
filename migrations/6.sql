USE genny;

BEGIN;

INSERT INTO migrations (id, description, action) VALUES (6, 'First HTML Step', 'INSERT');

INSERT INTO Step (name, `index`, Module_id, createdAt) VALUES('HTML Basics', 1, 1, 1448837434551);

SET @step_id = LAST_INSERT_ID();

INSERT INTO Step_directoryName_update (directoryName, Step_id, updatedAt) VALUES('html-basics', @step_id, 1448837447663);

COMMIT;
