const csv = require('csv-parser');
const fs = require('fs');
const { pool, client } = require('../middleware/postgresAPI.js');

fs.createReadStream('../datasources/example.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
