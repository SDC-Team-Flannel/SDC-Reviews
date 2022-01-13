const { exec } = require('child_process');

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
  firstLine: (filename) => {
    util.executeCommand(
      `head -n1 ${filename}`,
      (firstLine) => {
        const headersArray = firstLine.split(',');
        const fixedHeadersArray = util.lineBreakfix(headersArray);
        console.log(`${filename} => ${fixedHeadersArray}`);
      },
      (error) => {
        console.log('error grabbing first line', error);
      }
    );
  },
};

util.firstLine('../datasources/reviews.csv');
util.firstLine('../datasources/characteristic_reviews.csv');
util.firstLine('../datasources/characteristics.csv');
util.firstLine('../datasources/reviews_photos.csv');
