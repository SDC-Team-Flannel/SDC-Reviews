const { pool } = require('../middleware/postgresAPI.js');

const route = {
  // route to query all non reported reviews
  reviewsGet: (req) => {
    console.log('this is pool', pool);
    console.log('this is in routes: get', req);
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
