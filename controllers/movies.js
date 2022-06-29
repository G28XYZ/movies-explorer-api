const Movie = require('../database/Movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ValidationError = require('../errors/ValidationError');
const { errorMessages } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    movieId: movie_id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink: trailer_link,
    thumbnail,
    nameRU: name_ru,
    nameEN: name_en,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
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
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(errorMessages.createMovie));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) next(new NotFoundError(errorMessages.movieNotFound));
      if (req.user._id === movie.owner.toString()) {
        movie.remove();
        return movie;
      }
      return next(new ForbiddenError(errorMessages.removeMovie));
    })
    .then((movie) => res.send(movie))
    .catch(next);
};
