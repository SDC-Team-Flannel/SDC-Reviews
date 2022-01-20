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

app.post('/reviews', (req, res) => {
  console.log(req.body);
  route.reviewsPost(req.body);
  res.send('received post for reviews');
});

// TODO: turn url into req.review_id
app.put('/reviews', (req, res) => {
  var query = req.query.review_id.split('/');
  if (query[1] === 'helpful') {
    route.markHelpful(req.query);
    res.send('received post for helpful');
  } else {
    route.reportReview(req.query);
    res.send('received post for report');
  }
});

app.listen(port, () => {
  console.log(`Server is listening on localhost:${port}`);
});
