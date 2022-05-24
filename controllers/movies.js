const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ValidationError = require('../errors/ValidationError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Movie.create({ name, link, owner })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const removeCard = () => {
    Movie.findByIdAndRemove(req.params.cardId)
      .then((card) => res.send(card))
      .catch(next);
  };

  Movie.findById(req.params.cardId)
    .then((card) => {
      if (!card) next(new NotFoundError('Фильм не найден'));
      if (req.user._id === card.owner.toString()) {
        return removeCard();
      }
      return next(
        new ForbiddenError('Попытка удалить фильм другого пользователя')
      );
    })
    .catch(next);
};
