const formatMovieObject = (movie) => ({
  _id: movie._id,
  movieId: movie.movie_id,
  country: movie.country,
  director: movie.director,
  duration: movie.duration,
  year: movie.year,
  description: movie.description,
  owner: movie.owner,
  image: movie.image,
  trailerLink: movie.trailer_link,
  thumbnail: movie.thumbnail,
  nameRU: movie.name_ru,
  nameEN: movie.name_en,
});

module.exports = formatMovieObject;
