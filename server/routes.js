const express = require('express');
const queryTest = require('./read_db.js');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('request is: ', req.query);
  res.send(queryTest);
});

router.get('/meta', (req, res) => {

});

router.post('/', (req, res) => {

});

router.put('/:review_id/helpful', (req, res) => {

});

router.put('/:review_id/report', (req, res) => {

});

module.exports = router;
