const express = require('express');
const app = express();
app.use(express.json());
const { route } = require('./src/routes/routes.js');
const port = 3000;

app.get('/reviews/', (req, res) => {
  console.log(req.query);
  route.reviewsGet(req.query);
  res.send('received get for reviews', '200 OK');
});

app.get('/reviews/meta', (req, res) => {
  console.log(req.query);
  route.reviewsMetaGet(req.query);
  res.send('received get for metaData', '200 OK');
});

app.post('/reviews', (req, res) => {
  console.log(req.query);
  route.reviewsPost(req.query);
  res.send('received post for reviews', '201 CREATED');
});

// TODO: turn url into req.review_id
app.put('/reviews', (req, res) => {
  console.log(req.query);
  route.markHelpful(req.query);
  res.send('received post for helpful', '204 CONTENT');
});

// TODO: turn url into req.review_id
app.put('/reviews', (req, res) => {
  console.log(req.query);
  route.reviewsPost(req.query);
  res.send('received post for reviews', '204 CONTENT');
});

app.listen(port, () => {
  console.log(`Server is listening on localhost:${port}`);
});
