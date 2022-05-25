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

const app = express();
const routes = require('./routes');
const limiter = require('./middlewares/limiter');
const cors = require('./middlewares/cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

// CORS
app.use(cors);

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

// limiter
app.use('/', limiter);

// все роуты в index.js
routes(app);

// обработка ошибок
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
