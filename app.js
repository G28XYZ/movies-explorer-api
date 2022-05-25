const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./errors/errorHandler');

require('dotenv').config();

const { PORT = 3000, DATABASE = 'moviesdb' } = process.env;

const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

// CORS

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  /(https|http)?:\/\/(?:www\.|(?!www))front-movies.nomoredomains.xyz\/[a-z]+\/|[a-z]+\/|[a-z]+(\/|)/,
];

app.use((req, res, next) => {
  const { origin } = req.headers;

  if (
    allowedCors.some((e) => e.test && e.test(origin)) ||
    allowedCors.includes(origin)
  ) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
});

mongoose.connect(`mongodb://127.0.0.1:27017/${DATABASE}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});

app.use(requestLogger);

// app.get("/crash-test", () => {
//   setTimeout(() => {
//     throw new Error("Сервер сейчас упадёт");
//   }, 0);
// });

app.use('/', require('./routes/auth'));

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.all('*', (req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// {
//   "email":"aaa@aaa.ru",
//   "password":"111"
// }

// {
//   "country": "rus",
//   "director": "dir",
//   "duration": 2,
//   "year": "2000",
//   "description": "descr",
//   "image": "https://oke.com/asfd",
//   "trailerLink": "https://oke.com/asfd",
//   "thumbnail": "https://oke.com/asfd",
//   "nameRU": "ru",
//   "nameEN": "en"
// }
