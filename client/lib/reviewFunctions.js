import moment from 'moment';

export const sortReviews = (arr, type) => {
  //default sort is newest
  arr.sort((a, b) => b.review_id - a.review_id);

  if (type === 'oldest') {
    arr.sort((a, b) => a.review_id - b.review_id);
  }

  if (type === 'ratingHigh') {
    arr.sort((a, b) => b.rating - a.rating);
  }

  if (type === 'ratingLow') {
    arr.sort((a, b) => a.rating - b.rating);
  }

  if (type === 'helpful') {
    arr.sort((a, b) => b.helpfulness - a.helpfulness);
  }

  if (type === 'relevant') {
    let maxHelpfulness = arr.reduce(
      (a, b) => (b.helpfulness > a ? b.helpfulness : a),
      0
    );

    let normalizeDate = (x) =>
      100 - Math.min(100, (Date.now() - new Date(x)) / (24 * 60 * 60 * 1000));

    let normalizeHelpfulness = (x) => (100 * x) / maxHelpfulness;

    arr.sort(
      (a, b) =>
        normalizeDate(b.date) +
        normalizeHelpfulness(b.helpfulness) -
        (normalizeDate(a.date) + normalizeHelpfulness(a.helpfulness))
    );
  }

  return arr;
};

export const keywordFilter = (arr, keyword) => {
  return arr.filter(
    (review) =>
      review.body.toUpperCase().includes(keyword.toUpperCase()) ||
      review.summary.toUpperCase().includes(keyword.toUpperCase())
  );
  return arr;
};
