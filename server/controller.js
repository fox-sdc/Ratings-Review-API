/* eslint-disable prefer-const */
/* eslint-disable max-len */
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
    const { rows } = await db.metaQuery(product_id);
    if (rows.length > 0) {
      const char_data = {};
      for (let i = 0; i < rows.length; i += 1) {
        char_data[rows[i].characteristic_name] = {
          id: rows[i].char_join_id,
          value: (rows[i].total_score / (rows[i].total_votes * 5)) * 5,
        };
      }
      const response = {
        product_id,
        ratings: {
          1: rows[0].rating_1,
          2: rows[0].rating_2,
          3: rows[0].rating_3,
          4: rows[0].rating_4,
          5: rows[0].rating_5,
        },
        recommended: {
          true: rows[0].recommended_true_vote,
          false: rows[0].recommended_false_vote,
        },
        characteristics: char_data,
      };
      res.status(200).send(response);
    } else {
      res.status(200).send({
        product_id,
        ratings: {},
        recommended: {},
        characteristics: {},
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  const {
    product_id,
    rating,
    summary,
    body,
    photos,
    characteristics,
    recommend,
  } = req.body;
  const reviewer_name = req.body.name;
  const reviewer_email = req.body.email;
  const date = Date.now();

  try {
    await db.createMetaReview(product_id, rating, recommend);
    await db.createCharReview(characteristics);
    const { rows } = await db.createMainReview(product_id, rating, summary, body, date, reviewer_name, reviewer_email, recommend);
    if (photos.length > 0) {
      await db.createPhotosReview(rows[0].review_id, photos);
    }
    res.status(201).send('Created');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.put('/:review_id/helpful', async (req, res) => {
  try {
    const { review_id } = req.params;
    await db.markReviewHelpful(review_id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put('/:review_id/report', async (req, res) => {
  try {
    const { review_id } = req.params;
    await db.reportReview(review_id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
