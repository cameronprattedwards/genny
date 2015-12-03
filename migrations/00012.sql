USE genny;

BEGIN;

INSERT INTO migrations (id, description, action) VALUES (12, 'Create new steps', 'INSERT');


INSERT INTO Step(name, `index`, Module_id, createdAt) VALUES ('Environment Setup', 0, 1, UNIX_TIMESTAMP() * 1000);
SET @step_id = LAST_INSERT_ID();
INSERT INTO Step_branchName_update(branchName, Step_id, updatedAt) VALUES ('environment-setup', @step_id, UNIX_TIMESTAMP() * 1000);


INSERT INTO Step(name, `index`, Module_id, createdAt) VALUES ('Empty HTML Page', 1, 1, UNIX_TIMESTAMP() * 1000);
SET @step_id = LAST_INSERT_ID();
INSERT INTO Step_branchName_update(branchName, Step_id, updatedAt) VALUES ('empty-html-page', @step_id, UNIX_TIMESTAMP() * 1000);


INSERT INTO Step(name, `index`, Module_id, createdAt) VALUES ('Head Tag', 2, 1, UNIX_TIMESTAMP() * 1000);
SET @step_id = LAST_INSERT_ID();
INSERT INTO Step_branchName_update(branchName, Step_id, updatedAt) VALUES ('head-tag', @step_id, UNIX_TIMESTAMP() * 1000);


INSERT INTO Step(name, `index`, Module_id, createdAt) VALUES ('Body Tag', 3, 1, UNIX_TIMESTAMP() * 1000);
SET @step_id = LAST_INSERT_ID();
INSERT INTO Step_branchName_update(branchName, Step_id, updatedAt) VALUES ('body-tag', @step_id, UNIX_TIMESTAMP() * 1000);


INSERT INTO Step(name, `index`, Module_id, createdAt) VALUES ('Images and Links', 4, 1, UNIX_TIMESTAMP() * 1000);
SET @step_id = LAST_INSERT_ID();
INSERT INTO Step_branchName_update(branchName, Step_id, updatedAt) VALUES ('images-and-links', @step_id, UNIX_TIMESTAMP() * 1000);


INSERT INTO Step(name, `index`, Module_id, createdAt) VALUES ('Inline Tags', 5, 1, UNIX_TIMESTAMP() * 1000);
SET @step_id = LAST_INSERT_ID();
INSERT INTO Step_branchName_update(branchName, Step_id, updatedAt) VALUES ('inline-tags', @step_id, UNIX_TIMESTAMP() * 1000);


INSERT INTO Step(name, `index`, Module_id, createdAt) VALUES ('More Content', 6, 1, UNIX_TIMESTAMP() * 1000);
SET @step_id = LAST_INSERT_ID();
INSERT INTO Step_branchName_update(branchName, Step_id, updatedAt) VALUES ('more-content', @step_id, UNIX_TIMESTAMP() * 1000);


INSERT INTO Step(name, `index`, Module_id, createdAt) VALUES ('Self-Closing Tags', 7, 1, UNIX_TIMESTAMP() * 1000);
SET @step_id = LAST_INSERT_ID();
INSERT INTO Step_branchName_update(branchName, Step_id, updatedAt) VALUES ('self-closing-tags', @step_id, UNIX_TIMESTAMP() * 1000);


INSERT INTO Step(name, `index`, Module_id, createdAt) VALUES ('Accessibility', 8, 1, UNIX_TIMESTAMP() * 1000);
SET @step_id = LAST_INSERT_ID();
INSERT INTO Step_branchName_update(branchName, Step_id, updatedAt) VALUES ('accessibility', @step_id, UNIX_TIMESTAMP() * 1000);


INSERT INTO Step(name, `index`, Module_id, createdAt) VALUES ('Meta Tags', 9, 1, UNIX_TIMESTAMP() * 1000);
SET @step_id = LAST_INSERT_ID();
INSERT INTO Step_branchName_update(branchName, Step_id, updatedAt) VALUES ('meta-tags', @step_id, UNIX_TIMESTAMP() * 1000);

COMMIT;
