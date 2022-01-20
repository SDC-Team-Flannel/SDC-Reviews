const { sdc_db, example } = require('../middleware/postgresAPI.js');

const route = {
  // route to query all non reported reviews
  reviewsGet: async (req) => {
    // TODO: params will have product_id, count (amount per page), page (first 100?), sort
    // query should handle differnet params
    const { page, count, sort, product_id } = req;
    var correctSort;
    if (sort === 'newest') {
      correctSort = 'date desc';
    }
    // const queryStr =
    //   'SELECT reviews.review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, reviews_photos.id, reviews_photos.url FROM reviews LEFT JOIN reviews_photos ON reviews.review_id = reviews_photos.review_id WHERE reviews.review_id = ($1) ORDER BY ($2) LIMIT ($3)';
    const queryStr = `SELECT r.review_id, r.rating, r.summary, r.recommend, r.response, r.body, r.date, r.reviewer_name, r.helpfulness, CASE WHEN count(p) = 0 THEN ARRAY[]::json[] ELSE array_agg(p.photo) END AS photos FROM reviews r LEFT OUTER JOIN ( SELECT p1.review_id, json_build_object('id', p1.id, 'url', p1.url) as photo from reviews_photos p1 Order by p1.id) p on r.review_id = p.review_id where r.product_id = ($1) group by r.review_id order by ($2) limit ($3)`;

    const queryResults = await sdc_db.query(queryStr, [
      product_id,
      sort,
      count,
    ]);
    const results = {
      product: product_id,
      page: page,
      count: count,
      results: queryResults.rows,
    };
    console.log('Returned to Client: ', results);
    return results;
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
