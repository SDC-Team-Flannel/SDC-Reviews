const csv = require('csv-parser');
const fs = require('fs');
const { pool, client } = require('../middleware/postgresAPI.js');

client.connect();

fs.createReadStream(fileName, tableName)
  .pipe(csv())
  .on('data', (row) => {
    client.query(
      `INSERT INTO ${tableName} (json_info) VALUES ($1)`,
      [row],
      (err, res) => {
        if (err) {
          console.log('error in query', err);
        } else {
          console.log('DOWNLOAD in Progress');
        }
      }
    );
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
