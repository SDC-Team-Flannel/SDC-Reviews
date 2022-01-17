const { Pool } = require('pg');
const { Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'password',
  database: 'sdc_database',
  host: 'localhost',
  port: 5432,
});

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'password',
  database: 'sdc_staging',
  port: 5432,
});

module.exports = {
  pool,
  client,
};
