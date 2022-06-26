CREATE TABLE user(
  _id SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(80),
  password VARCHAR(30)
)

CREATE TABLE movie(
   movieId INTEGER,
   country VARCHAR(30),
    director VARCHAR(80),
    duration INTEGER,
    year VARCHAR(30),
    description VARCHAR(255),
    image VARCHAR(512),
    trailerLink VARCHAR(512),
    thumbnail VARCHAR(512),
    owner SERIAL PRIMARY KEY,
    FOREIGN KEY (owner) REFERENCES user(_id),
    nameRU VARCHAR(80),
    nameEN VARCHAR(80),
)