const { exec } = require('child_process');
const { pool, client } = require('../middleware/postgresAPI.js');

// execute an input command into the terminal (successCB and errorCB is optional)
const util = {
  executeCommand: (cmd, successCB, errorCB) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        if (errorCB) {
          errorCB(error);
        } else {
          console.log('error in execute command, no error cb', error);
        }
        return;
      }
      if (stderr) {
        if (errorCB) {
          errorCB(stderr);
        } else {
          console.log('error in execute command, no error cb', stderr);
        }
      }
      if (successCB) {
        successCB(stdout);
      }
    });
  },

  // fixes error in split when reading a line in CSV file => last value in array showing 'helpfullness\n'
  lineBreakfix: (array) => {
    let lastValue = array[array.length - 1];
    let newLastValue = lastValue.slice(0, lastValue.length - 1);
    array[array.length - 1] = newLastValue;
    return array;
  },

  // grabs first line (headers from CSV files)
  firstLine: (filename, next) => {
    util.executeCommand(
      `head -n1 ${filename}`,
      (firstLine) => {
        const headersArray = firstLine.split(',');
        const fixedHeadersArray = util.lineBreakfix(headersArray);
        console.log(fixedHeadersArray);
        next(fixedHeadersArray);
      },
      (error) => {
        console.log('error grabbing first line', error);
      }
    );
  },

  // grabs last line of CSV file
  lastLine: (filename) => {
    util.executeCommand(
      `tail -n1 ${filename}`,
      (secondLine) => {
        const headersArray = secondLine.split(',');
        const fixedHeadersArray = util.lineBreakfix(headersArray);
        console.log(`${filename} => ${fixedHeadersArray}`);
      },
      (error) => {
        console.log('error grabbing last line', error);
      }
    );
  },
};

// module.exports = {
//   util,
// };

const script = (fileName) => {
  // create connection to staging database
  client.connect();

  // total lines in csv file name
  var fileLineCount;
  // find number of lines total (with wc command)
  // TODO: change hardcode into fileName variable
  const lineCount = util.executeCommand(
    'wc -l ../datasources/reviews.csv',
    (lineCount) => {
      console.log('this is line count', lineCount);
      fileLineCount = lineCount;
    },
    (err) => {
      console.log(err);
    }
  );

  // read first line of file
  const storeFirstLine = (fileName) => {
    var first;
    util.firstLine('../datasources/reviews.csv', (array) => {
      first = array.join(' ');

      console.log('this is first line array', first);

      client.query(
        `INSERT INTO reviews_csv (info) VALUES ($1)`,
        [first],
        (err, res) => {
          if (err) {
            console.log(err);
          } else {
            console.log('this is query result', res);
          }
          client.end();
        }
      );
    });
  };

  storeFirstLine();

  // store line into staging
  // const line = grabFirstLine();

  // add line to staging database
  // client.query(
  //   `INSERT INTO reviews_csv (info) VALUES ($1)`,
  //   [line],
  //   (err, res) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log('this is query result', res);
  //     }
  //     client.end();
  //   }
  // );

  // while file line id in staging !== wc total
  // read first line
  // save line to staging
  // delete first line
  // break into readable array
  // fill into formatted database

  // check staged database for last id
  // check formatted database for last id
  // if ids match
  // success in ETL
  // else
  // handle missing data
};

script();
