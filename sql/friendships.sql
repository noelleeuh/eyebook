DROP TABLE IF EXISTS friendships;

CREATE TABLE friendships (
    id SERIAL primary key,
    receiver INT NOT NULL REFERENCES users(id),
    sender INT NOT NULL REFERENCES users(id),
    accepted BOOLEAN DEFAULT false,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
