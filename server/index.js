const express = require('express');
const app = express();
app.use(express.json());
const { route } = require('./src/routes/routes.js');
const port = 3000;

const { example } = require('./src/middleware/postgresAPI.js');

app.get('/reviews/', async (req, res) => {
  var start = Date.now();
  console.log('server received: ', req.query);
  var results = await route.reviewsGet(req.query);
  var end = Date.now() - start;
  const time = Math.floor(end / 1000);
  console.log('total time of request: ', `${time} seconds`);
  res.json(results);
});

app.get('/reviews/meta', async (req, res) => {
  console.log('server received: ', req.query);
  try {
    const reviewMetaData = await route.reviewsMetaGet(req.query);
    console.log('server sent back: ', reviewMetaData);
    res.json(reviewMetaData);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/reviews', async (req, res) => {
  console.log(req.body);
  const added = await route.reviewsPost(req.body);
  res.status(201).send(`Review id: ${added} added`);
});

app.put('/reviews/:review_id/helpful', async (req, res) => {
  const update = await route.markHelpful(req.params);
  if (!update) {
    res.status(400);
  }
  res.status(204);
});

app.put('/reviews/:review_id/report', async (req, res) => {
  const report = await route.reportReview(req.params);
  if (!report) {
    res.status(400);
  }
  res.status(204);
});

app.listen(port, () => {
  console.log(`Server is listening on localhost:${port}`);
});
