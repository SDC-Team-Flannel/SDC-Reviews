//Takes an array of form data and returns an object of errors
//or null if no errors are found

// product_id	integer	Required ID of the product to post the review for
// rating	int	Integer (1-5) indicating the review rating
// summary	text	Summary text of the review
// body	text	Continued or full text of the review
// recommend	bool	Value indicating if the reviewer recommends the product
// name	text	Username for question asker
// email	text	Email address for question asker
// photos	[text]	Array of text urls that link to images to be shown
// characteristics	object	Object of keys representing characteristic_id and values representing the review value for that characteristic. { "14": 5, "15": 5 //...}

export const validateReviewForm = (formData) => {
  //Rating
  let errors = {};

  if (!formData.rating) {
    errors.rating = 'rating is required';
  }

  if (!(formData.recommend === true || formData.recommend === false)) {
    errors.recommend = 'recommendation is required';
  }

  if (!formData.characteristics) {
    errors.characteristics = 'Must select at least 1 characteristic';
  }

  if (!formData.summary || formData.summary.length < 20) {
    errors.summary = 'Summary must be at least 20 characters';
  }

  if (!formData.body || formData.body.length < 50) {
    errors.body = 'Review must be at least 50 characters';
  }

  if (!formData.name || formData.name.length < 5) {
    errors.name = 'Username must be at least 5 characters';
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
    errors.email = 'email must be in xxx@yyy.com format';
  }

  if (!formData.email) {
    errors.email = 'Email address is required';
  }

  return errors;
};
