const express = require('express');
const routes = require('./controller');

const app = express();
app.use(express.json());

app.use('/reviews', routes);

module.exports = app;
