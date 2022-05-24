const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

require('dotenv').config();

const { JWT_SECRET = 'JWT_SECRET', NODE_ENV } = process.env;

const handleAuthError = (next) => {
  next(new UnauthorizedError('Необходима авторизация'));
};

const tokenVerify = (token) => {
  try {
    return jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET'
    );
  } catch (err) {
    return '';
  }
};

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return handleAuthError(next);
  }
  const token =
    req.cookies.jwt || req.headers.authorization.replace('Bearer ', '');

  if (!token) {
    return handleAuthError(next);
  }
  const payload = tokenVerify(token);
  if (!payload) {
    handleAuthError(next);
  }
  req.user = payload;
  return next();
};
