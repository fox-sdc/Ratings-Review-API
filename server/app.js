const express = require('express');
const cors = require('cors');
const routes = require('./controller');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/loaderio-525acf56a56bae826adb0ce47e4f2eb5', async (req, res) => {
  try {
    res.send('loaderio-525acf56a56bae826adb0ce47e4f2eb5');
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

app.use('/reviews', routes);

module.exports = app;
