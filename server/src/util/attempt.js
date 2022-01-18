const csv = require('csv-parser');
const fs = require('fs');
const { pool, client } = require('../middleware/postgresAPI.js');

fs.createReadStream('../datasources/example.csv')
  .pipe(csv())
  .on('data', (row) => {
    client.query(`SELECT * FROM reviews_csv RETURNING id;`, [], (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('this is query result', res);
      }
    });
    console.log('row parsed', typeof row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
