const formatMovieObject = require('../utils/formatMovieObject');
const db = require('./db');

class Movie {
  async find(movieData) {
    if (Object.keys(movieData).length === 0) {
      try {
        const movies = await db.query('SELECT * FROM movie');
        return Promise.resolve(
          movies.rows.map((movie) => formatMovieObject(movie))
        );
      } catch (err) {
        console.log(err);
        return Promise.reject('GetMovies error');
      }
    }
  }

  async create(movieData) {
    const {
      movie_id,
      country,
      director,
      duration,
      year,
      description,
      owner,
      image,
      trailer_link,
      thumbnail,
      name_ru,
      name_en,
    } = movieData;

    try {
      const movie = await db.query(
        `INSERT INTO movie (
          _id,
          movie_id,
          country,
          director,
          duration,
          year,
          description,
          owner,
          image,
          trailer_link,
          thumbnail,
          name_ru,
          name_en
          ) values (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING _id`,
        [
          movie_id,
          country,
          director,
          duration,
          year,
          description,
          owner,
          image,
          trailer_link,
          thumbnail,
          name_ru,
          name_en,
        ]
      );
      return Promise.resolve({
        _id: movie.rows[0]._id,
        movieId: movie_id,
        country,
        director,
        duration,
        year,
        description,
        owner,
        image,
        trailerLink: trailer_link,
        thumbnail,
        nameRU: name_ru,
        nameEN: name_en,
      });
    } catch (err) {
      console.log(err);
      return Promise.reject({ name: 'ValidationError' });
    }
  }

  _remove(id) {
    try {
      return db.query('DELETE FROM movie where _id = $1', [id]);
    } catch (err) {
      console.log(err);
      return Promise.reject('Delete Error');
    }
  }

  async findById(id) {
    try {
      let movie = await db.query('SELECT * FROM movie where _id = $1', [id]);
      if (Object.keys(movie.rows[0]).length === 0) {
        return Promise.resolve(null);
      }
      movie = movie.rows[0];
      return Promise.resolve({
        ...formatMovieObject(movie),
        remove: () => this._remove(id),
      });
    } catch (err) {
      console.log(err);
      return Promise.resolve(null);
    }
  }
}

module.exports = new Movie();
