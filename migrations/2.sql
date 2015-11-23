USE genny;

INSERT INTO migrations (id, description, action) VALUES (2, 'Create User table', 'CREATE');

CREATE TABLE User(
	id INT NOT NULL,
	repoName VARCHAR(255) NOT NULL,
	token VARCHAR(255) NOT NULL,
	webhookSecret VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
)
