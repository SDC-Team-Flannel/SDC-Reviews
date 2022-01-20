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
    // MISSING PHOTO DATA AND RETURNING ONLY ONE REVIEW
    // const queryStr =
    //   'SELECT reviews.review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, reviews_photos.id, reviews_photos.url FROM reviews LEFT JOIN reviews_photos ON reviews.review_id = reviews_photos.review_id WHERE reviews.review_id = ($1) ORDER BY ($2) LIMIT ($3)';

    // ATTEMPT TO MAKE TWO QUERIES IN ONE REQUEST: ASYNC PROBLEM
    // const queryStr =
    //   'SELECT * FROM reviews WHERE product_id = ($1) ORDER BY ($2) LIMIT ($3)';

    // OBJECT CREATE
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
  reviewsPost: async (req) => {
    console.log('this is in routes: Add', req);

    // input for photos
    const photoUpdate = async (array) => {
      array.forEach(async (photo) => {
        await sdc_db.query(
          'INSERT INTO reviews_photos (review_id, url) VALUES ($1, $2)',
          [newId, photo]
        );
      });
    };

    //Creating Date for database storage
    var date = new Date();
    let inputDate = date.toISOString().slice(0, 10);

    //input values
    const {
      product_id,
      rating,
      summary,
      body,
      recommend,
      name,
      email,
      photos,
      characteristics,
    } = req;

    //insert for database
    const queryStr =
      'INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING review_id';

    // Query function
    const post = await sdc_db.query(queryStr, [
      product_id,
      rating,
      inputDate,
      summary,
      body,
      recommend,
      false,
      name,
      email,
      ,
      0,
    ]);

    console.log('this is post', post.rows[0].review_id);

    // new review_id added
    const newId = post.rows[0].review_id;

    // if photos added to review, insert photos
    if (photos.length > 0) {
      photoUpdate(photos);
    }

    return newId;
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
