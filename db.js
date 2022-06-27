const { Pool } = require('pg');

require('dotenv').config();

const { DATABASE_URI } = process.env;

const pool = new Pool({
  connectionString: DATABASE_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
