USE genny;

BEGIN;

INSERT INTO migrations (id, description, action) VALUES (13, 'Drop Step, Module, Step_branchName_update, and Step_delete tables', 'DROP');

ALTER TABLE Step_visit DROP FOREIGN KEY fk_visit_to_step_id;

ALTER TABLE Step_delete DROP FOREIGN KEY fk_step_delete_id;

ALTER TABLE Step_commit DROP FOREIGN KEY fk_commit_to_step_id;

ALTER TABLE Step_branchName_update DROP FOREIGN KEY fk_step_id;

ALTER TABLE Step DROP FOREIGN KEY fk_module_id;

DROP TABLE Step_delete;

DROP TABLE Step_branchName_update;

DROP TABLE Step;

DROP TABLE Module;

ALTER TABLE Step_visit MODIFY COLUMN Step_id VARCHAR(255);

ALTER TABLE Step_commit MODIFY COLUMN Step_id VARCHAR(255);

COMMIT;
