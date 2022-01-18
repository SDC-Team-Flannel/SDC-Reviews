const { Pool } = require('pg');
const { Client } = require('pg');

const sdc_db = new Pool({
  user: 'postgres',
  password: 'password',
  database: 'sdc_database',
  host: 'localhost',
  port: 5432,
});

const example = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'password',
  database: 'sdc_staging',
  port: 5432,
});

module.exports = {
  sdc_db,
  example,
};
