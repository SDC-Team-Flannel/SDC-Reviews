const express = require('express');
const app = express();
app.use(express.json());
const { route } = require('./routes/routes.js');
const port = 3000;

app.get('/reviews/', (req, res) => {
  console.log(req.query);
  route.reviewsGet(req.query);
  res.send('received something');
});

app.listen(port, () => {
  console.log(`Server is listening on localhost:${port}`);
});
