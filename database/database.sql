create TABLE user(
  _id SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(80),
  password VARCHAR(30)
);

create TABLE movie(
  movie_id INTEGER,
  country VARCHAR(30),
  director VARCHAR(80),
  duration INTEGER,
  year VARCHAR(30),
  description VARCHAR(255),
  image VARCHAR(512),
  trailer_link VARCHAR(512),
  thumbnail VARCHAR(512),
  owner SERIAL PRIMARY KEY,
  FOREIGN KEY (owner) REFERENCES person(_id),
  name_ru VARCHAR(80),
  name_en VARCHAR(80)
);