CREATE DATABASE sdc_staging;

CREATE TABLE reviews_csv(
  id INT GENERATED ALWAYS AS IDENTITY,
  info TEXT NOT NULL,
  PRIMARY KEY(id)
);

CREATE DATABASE sdc_database;

-- CREATE TABLE reviews(
--   id SERIAL PRIMARY KEY,
--   product_id INTEGER,
--   rating SMALLINT,
--   date DATE,
--   summary VARCHAR(50),
--   body VARCHAR(255),
--   recommend BOOLEAN,
--   reported BOOLEAN,
--   reviewer_name VARCHAR(50),
--   reviewer_email VARCHAR(50),
--   reponse VARCHAR(255),
--   helpfullness SMALLINT
-- );



-- const schemas = {
--   reviewsSchema: {
--     id: Number,
--     product_id: Number,
--     rating: Number,
--     date: String,
--     summary: String,
--     body: String,
--     recommend: Boolean,
--     reported: Boolean,
--     reviewer_name: String,
--     reviewer_email: String,
--     response: Boolean,
--     helpfullness: Number,
--   },

--   charReviewsSchema: {
--     id: Number,
--     charateristic_id: Number,
--     review_id: Number,
--     value: Number,
--   },

--   characteristicsSchema: {
--     id: Number,
--     product_id: Number,
--     name: String,
--   },

--   reviewsPhotosSchema: {
--     id: Number,
--     review_id: Number,
--     url: String,
--   };
-- }

-- module.exports{
--   schemas,
-- }