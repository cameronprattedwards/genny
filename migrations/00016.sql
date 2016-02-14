USE genny;

BEGIN;

INSERT INTO migrations (id, description, action) VALUES (16, 'Move tokens to User_token_update', 'CREATE,INSERT,ALTER');

CREATE TABLE User_token_update(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	User_id INT NOT NULL,
	token varchar(255) NOT NULL,
	updatedAt BIGINT NOT NULL
);

ALTER TABLE User_token_update ADD CONSTRAINT fk_user_token_update_id FOREIGN KEY (User_id) REFERENCES User(id);

INSERT INTO User_token_update (User_id, token, updatedAt) SELECT id, token, UNIX_TIMESTAMP() * 1000 FROM User;

ALTER TABLE User DROP token;

COMMIT;
