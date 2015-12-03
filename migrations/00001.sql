USE genny;

CREATE TABLE migrations (
	id INT NOT NULL,
	`description` VARCHAR(255) NOT NULL,
	`action` enum('CREATE','ALTER','DELETE') NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO migrations (id, description, action) VALUES (1, 'Create migrations table', 'CREATE');
