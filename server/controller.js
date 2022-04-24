/* eslint-disable camelcase */
const Router = require('express-promise-router');
const db = require('./model');

const router = new Router();

router.get('/', async (req, res) => {
  try {
    let {
      product_id,
      page = 0,
      count = 5,
      sort = 'r.helpfulness',
    } = req.query;
    if (sort === 'newest') {
      sort = 'r.date';
    } else if (sort === 'helpful' || sort === 'relevant') {
      sort = 'r.helpfulness';
    }
    const { rows } = await db.getAllReviews(product_id, sort);
    const newPage = parseInt(page, 10);
    const newCount = parseInt(count, 10);
    const start = page * count;
    const end = start + count;
    const resultsArr = rows.slice(start, end);
    const output = {
      product: product_id,
      page: newPage,
      count: newCount,
      results: resultsArr,
    };
    res.status(200).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/meta', async (req, res) => {
  try {
    const { product_id } = req.query;
    console.log(product_id);
    const { rows } = await db.getMetaData(product_id);
    const { ratings, recommended, characteristics } = rows[0];
    const output = {
      product_id,
      ratings,
      recommended,
      characteristics,
    };
    res.status(200).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {

});

router.put('/:review_id/helpful', async (req, res) => {

});

router.put('/:review_id/report', async (req, res) => {

});

module.exports = router;
