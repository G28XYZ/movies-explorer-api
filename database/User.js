const db = require('./db');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { errorMessages } = require('../utils/constants');
class User {
  async create(userData) {
    const { name, password, email } = userData;
    try {
      const user = await db.query(
        'INSERT INTO person (_id, name, email, password) values (gen_random_uuid(), $1, $2, $3) RETURNING _id',
        [name, email, password]
      );
      const { _id } = user.rows[0];
      return Promise.resolve({ _id, name, email });
    } catch (err) {
      console.log(err);
      return Promise.resolve(null);
    }
  }

  _findOne = (param, name) =>
    db.query(`SELECT * FROM person where ${name} = $1`, [param]);

  async find(userData) {
    const { email, _id } = userData;
    let user;
    if (email) {
      try {
        user = await this._findOne(email, 'email');
        return Promise.resolve(user.rows[0]);
      } catch (err) {
        console.log(err);
        return Promise.resolve(null);
      }
    }
    if (_id) {
      try {
        user = await this._findOne(_id, '_id');
        return Promise.resolve(user.rows[0]);
      } catch (err) {
        console.log(err);
        return Promise.resolve(null);
      }
    }
  }

  async findByIdAndUpdate(_id, userData) {
    const { name, email } = userData;
    try {
      await db.query(
        `UPDATE person SET name = $1, email = $2 where _id = $3 RETURNING *`,
        [name, email, _id]
      );
      return Promise.resolve({ name, email, _id });
    } catch (err) {
      console.log(err);
      return Promise.resolve(null);
    }
  }

  async findUserByCredentials(email, password) {
    let user;
    try {
      user = await this._findOne(email, 'email');
      user = user.rows[0];
      if (!user) {
        return Promise.reject(
          new UnauthorizedError(errorMessages.incorrectData)
        );
      }
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        return Promise.reject(
          new UnauthorizedError(errorMessages.incorrectData)
        );
      }
      return user;
    } catch (err) {
      console.log(err);
      return Promise.reject(new UnauthorizedError(errorMessages.incorrectData));
    }
  }
}

module.exports = new User();
