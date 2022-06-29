create TABLE person(
  _id UUID PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(80),
  password VARCHAR(255)
);

create TABLE movie(
  _id UUID PRIMARY KEY,
  movie_id INTEGER,
  country TEXT,
  director TEXT,
  duration INTEGER,
  year VARCHAR(30),
  description TEXT,
  image TEXT,
  trailer_link TEXT,
  thumbnail TEXT,
  owner UUID,
  FOREIGN KEY (owner) REFERENCES person(_id),
  name_ru TEXT,
  name_en TEXT
);