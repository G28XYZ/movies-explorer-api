const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  /(https|http)?:\/\/(?:www\.|(?!www))front-movies.nomoredomains.xyz\/[a-z]+\/|[a-z]+\/|[a-z]+(\/|)/,
];

module.exports = { allowedCors };
