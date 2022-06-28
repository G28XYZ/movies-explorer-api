const db = require('./db');

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
}

module.exports = new User();
