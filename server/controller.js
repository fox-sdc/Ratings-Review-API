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
    for (let i = 0; i < output.results.length; i += 1) {
      const utcSeconds = (output.results[i].date).toString();
      const d = new Date();
      console.log(d);
      d.toISOString(utcSeconds);
      output.results[i].date = d;
    }
    res.status(200).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/meta', async (req, res) => {
  try {
    const { product_id } = req.query;
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
  try {
    const { review_id } = req.params;
    await db.markReviewHelpful(review_id);
    res.status(204).send('nice');
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put('/:review_id/report', async (req, res) => {

});

module.exports = router;
