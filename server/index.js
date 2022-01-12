const express = require('express');
const app = express();
app.use(express.json());
var compression = require('compression');
app.use(compression());
const port = 3000;

const fs = require('fs');

app.use(express.static('./public/'));

app.get('/messages', (req, res) => {
  fs.readFile('./server/messages.txt', 'utf8', (err, data) => {
    let arr = data.split('\n');
    res.json({ message: arr[Math.floor(Math.random() * arr.length)] });
  });
});

app.listen(port, () => {
  console.log('Server is running at http://localhost:' + port);
});
