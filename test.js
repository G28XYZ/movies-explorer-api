const { Client } = require('pg');

require('dotenv').config();

const { DATABASE_URI } = process.env;

const client = new Client({
  connectionString: DATABASE_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();
