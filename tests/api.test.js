import api from '../client/api.js';

describe('Testing API Library', () => {

  it('api.getProducts({page, count})', async () => {
    const products = await api.getProducts({ page: 1, count: 10 });
    expect(products.length).toEqual(10);
  });

  it('api.getProduct({product_id})', async () => {
    const product = await api.getProduct({ product_id: 37311 });
    expect(product).toHaveProperty('name', 'Camo Onesie');
  });

  it('api.getProduct({product_id}) should return error if no product_id', async () => {
    try {
      const product = await api.getProduct();
    } catch (e) {
      expect(e.message).toEqual('must provide product_id');
    }
  });

  it('api.getProduct({product_id})', async () => {
    const productStyles = await api.getProductStyles({ product_id: 37311 });
    expect(productStyles).toHaveProperty('product_id', '37311');
  });

  it('api.getRelatedProducts({product_id})', async () => {
    const relatedProducts = await api.getRelatedProducts({ product_id: 37311 });
    expect(Array.isArray(relatedProducts)).toEqual(true);
  });

  it('getReviews({ product_id, count = 5, page = 1, sort = "newest" })', async () => {
    const reviews = await api.getReviews({ product_id: 37311 });
    expect(reviews).toHaveProperty('product', '37311');
    expect(Array.isArray(reviews.results)).toEqual(true);
  });

  it('getReviewMeta({ product_id })', async () => {
    const reviewMeta = await api.getReviewMeta({ product_id: 37311 });
    expect(reviewMeta).toHaveProperty('product_id', '37311');
    expect(reviewMeta).toHaveProperty('ratings');
    expect(reviewMeta).toHaveProperty('characteristics');
  });

  it('getQuestions({ product_id, page = 1, count = 5 })', async () => {
    const questions = await api.getQuestions({ product_id: 37313 });
    expect(questions).toHaveProperty('product_id', '37313');
    expect(questions).toHaveProperty('results');
  });

  it('getAnswers({ question_id })', async () => {
    const answers = await api.getAnswers({ question_id: 543286 });
    expect(answers).toHaveProperty('question', '543286');
    expect(answers).toHaveProperty('results');
  });

  it('addQuestion({ body, name, email, product_id })', async () => {
    const result = await api.addQuestion({
      body: 'Cool Question 123ad9na',
      name: 'williamsmith',
      email: 'will@smith.com',
      product_id: 37318
    });
    expect(result.status).toEqual(201);
    const questions = await api.getQuestions({ product_id: 37318, count: 100 });
    let found = questions.results.reduce((a, b) => a || b.question_body === 'Cool Question 123ad9na', false);
    expect(found).toEqual(true);
  });


  it('addQuestion({ body, name, email, product_id }) should throw error if params wrong', async () => {
    try {
      const result = await api.addQuestion({
        body: 'Cool Question 123ad9na',
        name: 'williamsmith',
        email: 'will@smith.com',
      });
    } catch (e) {
      expect(e.message).toEqual('params must contain only {body, name, email, product_id}');
    }
  });

  it('addAnswer({ question_id, body, name, email, photos })', async () => {
    const result = await api.addAnswer({
      question_id: 543286,
      body: 'Cool Answer 123ad9na',
      name: 'williamsmith',
      email: 'will@smith.com',
      photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Generic_Camera_Icon.svg/200px-Generic_Camera_Icon.svg.png']
    });
    expect(result.status).toEqual(201);
    const answers = await api.getAnswers({ question_id: 543286 });
    let found = answers.results.reduce((a, b) => a || b.body === 'Cool Answer 123ad9na', false);
    expect(found).toEqual(true);
  });

  it('addAnswer({ question_id, body, name, email, photos }) should throw error if params wrong', async () => {
    try {
      const result = await api.addAnswer({
        body: 'Cool Question 123ad9na',
        name: 'williamsmith',
        email: 'will@smith.com',
      });
    } catch (e) {
      expect(e.message).toEqual('params must contain only {question_id, body, name, email, photos}');
    }
  });

  it('should mark questions as helpful and report questions', async () => {
    const answer_id = 5269123;
    const question_id = 543261;
    const result = await api.markQuestionAsHelpful({ question_id });
    expect(result.status).toEqual(204);
    const result2 = await api.reportQuestion({ question_id });
    expect(result2.status).toEqual(204);
    const result3 = await api.markAnswerAsHelpful({ answer_id });
    expect(result3.status).toEqual(204);
    const result4 = await api.reportAnswer({ answer_id });
    expect(result4.status).toEqual(204);
  });

  it('should add a review for a product', async () => {
    const res = await api.addReview({
      product_id: 37311,
      rating: 3,
      summary: 'I really liked this product 123s2',
      body: 'it was nice and easy to use',
      recommend: true,
      name: 'reviewer 12aaa',
      email: 'reviewer@review.com',
      photos: [],
      characteristics: {}
    });
    expect(res.status).toEqual(201);
    const reviews = await api.getReviews({ product_id: 37311, count: 100, sort: 'newest' });
    let found = reviews.results.reduce((a, b) => a || b.reviewer_name === 'reviewer 12aaa', false);
    expect(found).toEqual(true);
  });

  it('should mark review as helpful', async () => {

    let res1 = await api.getReviews({ product_id: 37312 });
    let oldReview = res1.results[0];
    let review_id = oldReview.review_id;

    let res2 = await api.markReviewAsHelpful({ review_id });
    expect(res2.status).toEqual(204);

    let res3 = await api.getReviews({ product_id: 37312 });
    let updatedReview = res3.results.filter(obj => obj.review_id === review_id)[0];

    expect(updatedReview.helpfulness).toEqual(oldReview.helpfulness + 1);
  });

  it('should report a review', async () => {
    let res = await api.reportReview({ review_id: 1115341 });
    expect(res.status).toEqual(204);
  });



});