DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL primary key,
    fname VARCHAR(50) not null,
    sname VARCHAR(100) not null,
    email VARCHAR(200) not null unique,
    pword VARCHAR(100) not null,
    pic VARCHAR(300),
    bio VARCHAR(400)
);
