const { util } = require('./commands.js');

const headers = util.firstLine('../datasources/reviews.csv');

console.log(headers);
