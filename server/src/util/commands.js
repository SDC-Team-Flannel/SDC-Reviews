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
        console.log('this is the firstLine', fixedHeadersArray);
        next(fixedHeadersArray);
      },
      (error) => {
        console.log('error grabbing first line', error);
      }
    );
  },

  // grabs last line of CSV file
  lastLine: (filename, next) => {
    util.executeCommand(
      `tail -n1 ${filename}`,
      (secondLine) => {
        const headersArray = secondLine.split(',');
        const fixedHeadersArray = util.lineBreakfix(headersArray);
        console.log('this is the last line', fixedHeadersArray);
        next(fixedHeadersArray);
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
  const valueReturn = async (func, value) => {
    var result = await func(value);
    return result;
  };
  // find number of lines total (with wc command)
  // TODO: change hardcode into fileName variable
  const lineCount = (fileName, callback) => {
    util.executeCommand(
      `wc -l ${fileName}`,
      (lineCount) => {
        console.log('this is line count', lineCount);
        callback(lineCount);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  // read first line of file
  const storeFirstLine = (fileName) => {
    var first;
    util.firstLine(`${fileName}`, (array) => {
      first = array.join(' ');
      console.log('this is first line array', first);
      client.query(`SELECT * FROM reviews_csv`, [], (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log('this is query result', res);
        }
      });
    });
  };

  const deleteFirstLine = (fileName) => {
    util.executeCommand(
      `sed '1d' ${fileName}`,
      (success) => {
        console.log('success in delete firstLine', success);
      },
      (error) => {
        console.log('error in delete firstLine', error);
      }
    );
  };

  const startETL = async (fileName) => {
    var first;
    var last;
    const assignFirst = async () => {
      await util.firstLine(fileName, (results) => {
        console.log('first assigned to', results);
        first = results;
      });
    };
    const assignLast = async () => {
      await util.lastLine(fileName, (results) => {
        console.log('last assigned to', results);
        last = results;
      });
    };
    assignFirst();
    assignLast();

    console.log('this is outside the while loop', first, last);

    while (first !== last) {
      console.log('this is inside the while loop', first, last);

      await util.firstLine(fileName, (results) => {
        console.log('this file was read', results);
      });

      console.log('Line was stored');

      await deleteFirstLine(fileName);

      console.log('Line was cleaned');
    }
  };

  startETL('../datasources/example.csv');

  client.end();

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
