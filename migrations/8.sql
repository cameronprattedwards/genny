USE genny;

BEGIN;

INSERT INTO migrations (id, description, action) VALUES (8, 'Create Step_visit table', 'CREATE');

CREATE TABLE Step_visit(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	User_id INT NOT NULL,
	Step_id INT UNSIGNED NOT NULL,
	visitedAt BIGINT UNSIGNED NOT NULL
);

ALTER TABLE Step_visit ADD CONSTRAINT fk_visit_to_step_id FOREIGN KEY (Step_id) REFERENCES Step(id);
ALTER TABLE Step_visit ADD CONSTRAINT fk_visit_to_user_id FOREIGN KEY (User_id) REFERENCES User(id);

COMMIT;
