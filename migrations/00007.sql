USE genny;

BEGIN;

INSERT INTO migrations (id, description, action) VALUES (7, 'Create Step_commit table', 'CREATE');

CREATE TABLE Step_commit(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	Step_id INT UNSIGNED NOT NULL,
	User_id INT NOT NULL,
	success TINYINT,
	committedAt BIGINT UNSIGNED NOT NULL
);

ALTER TABLE Step_commit ADD CONSTRAINT fk_commit_to_step_id FOREIGN KEY (Step_id) REFERENCES Step(id);
ALTER TABLE Step_commit ADD CONSTRAINT fk_user_id FOREIGN KEY (User_id) REFERENCES User(id);

COMMIT;
