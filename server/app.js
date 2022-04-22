const express = require('express');
const queryTest = require('./read_db.js');
// eslint-disable-next-line import/extensions
require('dotenv').config();

const app = express();

// eslint-disable-next-line no-unused-vars
app.get('/', (req, res) => {
  res.send(queryTest);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on  http://localhost:${process.env.PORT}`);
});
