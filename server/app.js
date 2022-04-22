const express = require('express');
const routes = require('./routes.js');
require('dotenv').config();

const app = express();

app.use('/reviews', routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on  http://localhost:${process.env.PORT}`);
});
