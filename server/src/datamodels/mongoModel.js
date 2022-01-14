const schemas = {
  reviewsSchema: {
    id: Number,
    product_id: Number,
    rating: Number,
    date: String,
    summary: String,
    body: String,
    recommend: Boolean,
    reported: Boolean,
    reviewer_name: String,
    reviewer_email: String,
    response: Boolean,
    helpfullness: Number,
  },

  charReviewsSchema: {
    id: Number,
    charateristic_id: Number,
    review_id: Number,
    value: Number,
  },

  characteristicsSchema: {
    id: Number,
    product_id: Number,
    name: String,
  },

  reviewsPhotosSchema: {
    id: Number,
    review_id: Number,
    url: String,
  };
}

module.exports{
  schemas,
}