USE genny;

BEGIN;

INSERT INTO migrations (id, description, action) VALUES (5, 'First module and step', 'INSERT');

INSERT INTO Module (name, `index`, createdAt) VALUES('Setup', 0, 1448729580101);

SET @module_id = LAST_INSERT_ID();

INSERT INTO Step (name, `index`, Module_id, createdAt) VALUES('Terminal Basics', 0, @module_id, 1448729580102);

SET @step_id = LAST_INSERT_ID();

INSERT INTO Step_directoryName_update (directoryName, Step_id, updatedAt) VALUES('terminal-basics', @step_id, 1448729580103);

COMMIT;
