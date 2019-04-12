DROP TABLE IF EXISTS chat;

CREATE TABLE chat (
    id SERIAL primary key,
    sender INT NOT NULL REFERENCES users(id),
    msg TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
