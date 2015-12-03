USE genny;

INSERT INTO migrations (id, description, action) VALUES (3, 'Add User.createdAt', 'ALTER');

ALTER TABLE User ADD createdAt BIGINT NOT NULL;
