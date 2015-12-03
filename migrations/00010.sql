USE genny;

BEGIN;

INSERT INTO migrations (id, description, action) VALUES (10, 'Add Step_delete Table', 'CREATE');

CREATE TABLE Step_delete(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	Step_id INT UNSIGNED NOT NULL,
	createdAt BIGINT NOT NULL
);

ALTER TABLE Step_delete ADD CONSTRAINT fk_step_delete_id FOREIGN KEY (Step_id) REFERENCES Step(id);

COMMIT;
