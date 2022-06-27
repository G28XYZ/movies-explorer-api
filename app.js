const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const db = require('./db');
const errorHandler = require('./errors/errorHandler');

require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();
const routes = require('./routes');
const limiter = require('./middlewares/limiter');
const cors = require('./middlewares/cors');
const { errorMessages } = require('./utils/constants');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

// CORS
app.use(cors);

// DB connect
db.connect();

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(errorMessages.crash);
  }, 0);
});

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
