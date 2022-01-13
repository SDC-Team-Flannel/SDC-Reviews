const path = require('path');

module.exports = {
  entry: './server/index.js',
  output: {
    filename: 'init.js',
    path: path.resolve(__dirname),
  },
  mode: 'development',
};
