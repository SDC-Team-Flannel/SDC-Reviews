const { sdc_db, example } = require('../middleware/postgresAPI.js');

const route = {
  // route to query all non reported reviews
  reviewsGet: async (req) => {
    // TODO: params will have product_id, count (amount per page), page (first 100?), sort
    // query should handle differnet params
    const { count } = req;
    const queryStr = 'SELECT * FROM reviews_csv ORDER BY id LIMIT ($1)';
    const exampleInput = await example.query(queryStr, [count]);
    console.log('exampleInput: ', exampleInput);
    return exampleInput;
  },

  // route to query review metadata based on provided product_id
  reviewsMetaGet: (req) => {
    console.log('this is in routes: Metadata', req);
  },

  // route to add review to reviews data
  reviewsPost: (req) => {
    console.log('this is in routes: Add', req);
  },

  // route to update review as helpful
  markHelpful: (req) => {
    console.log('this is in routes: helpful', req);
  },

  // route to update review as reported (makes it no longer available in reviews get)
  reportReview: (req) => {
    console.log('this is in routes: report', req);
  },
};

module.exports = {
  route,
};
