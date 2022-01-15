const express = require('express');
const app = express();
app.use(express.json());
const { route } = require('./src/routes/routes.js');
const port = 3000;

app.get('/reviews/', (req, res) => {
  console.log(req.query);
  route.reviewsGet(req.query);
  res.send('received get for reviews');
});

app.get('/reviews/meta', (req, res) => {
  console.log(req.query);
  route.reviewsMetaGet(req.query);
  res.send('received get for metaData');
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
