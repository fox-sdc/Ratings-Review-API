/* eslint-disable max-len */
/* eslint-disable camelcase */
const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  host: process.env.PGHOST,
});

module.exports = {
  metaQuery(product_id) {
    const query = {
      name: 'get-meta',
      text: '',
      values: [],
    };
    query.values = [product_id];
    query.text = `
      SELECT * FROM meta, join_characteristic_votes, characteristics
      WHERE meta.product_id = $1
      AND join_characteristic_votes.product_id = $1
      AND join_characteristic_votes.characteristic_id=characteristics.characteristics_id
    `;
    return pool.query(query);
  },

  getAllReviews(product_id, sort) {
    const query = {
      name: 'get-all-reviews',
      text: '',
      values: [],
    };
    query.values = [product_id];
    query.text = `
        SELECT
          r.review_id,
          r.rating,
          r.summary,
          r.recommend,
          r.response,
          r.body,
          r.date,
          r.reviewer_name,
          r.helpfulness,
          (SELECT COALESCE(photos, '[]'::JSON)
          FROM (
            SELECT
              JSON_AGG(
                JSON_BUILD_OBJECT(
                  'id', photos.photo_id,
                  'url', photos.url
                )
              ) AS photos
            FROM photos
            WHERE photos.review_id = r.review_id
            ) AS photos
          ) AS photos
          FROM reviews AS r
          LEFT JOIN photos AS p ON r.review_id = p.review_id
          WHERE product_id=$1
          GROUP BY r.review_id
          ORDER BY ${sort} DESC;
        `;
    return pool.query(query);
  },

  markReviewHelpful(review_id) {
    const query = {
      name: 'incease-review-helpfulness',
      text: '',
      values: [],
    };
    query.values = [review_id];
    query.text = `
      UPDATE reviews
      SET helpfulness = (helpfulness + 1)
      WHERE review_id = $1;
    `;
    return pool.query(query);
  },

  reportReview(review_id) {
    const query = {
      name: 'report-review',
      text: '',
      values: [],
    };
    query.values = [review_id];
    query.text = `
      UPDATE reviews
      SET reported = true
      WHERE review_id = $1;
    `;
    return pool.query(query);
  },

  createMainReview(product_id, rating, summary, body, date, reviewer_name, reviewer_email, recommend) {
    const query = {
      name: 'create-review-main',
      text: '',
      values: [],
    };
    query.values = [product_id, rating, summary, body, date, reviewer_name, reviewer_email, recommend];
    query.text = `
      INSERT INTO reviews(product_id, rating, summary, body, date, reviewer_name, reviewer_email, recommend)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING review_id
      ;
      `;
    return pool.query(query);
  },

  createMetaReview(product_id, rating, recommend) {
    const query = {
      name: 'create-review-meta',
      text: '',
      values: [],
    };
    const rec = recommend ? 'recommended_true_vote' : 'recommended_false_vote';
    const score = `rating_${rating}`;

    query.values = [product_id];
    query.text = `
      UPDATE meta
      SET ${rec} = ${rec} + 1, ${score} = ${score} + 1
      WHERE product_id = $1
      ;
    `;
    return pool.query(query);
  },

  createPhotosReview(review_id, photos) {
    const query = {
      name: 'create-review-photos',
      text: '',
      values: [],
    };
    let stringPhotos = '[';
    for (let i = 0; i < photos.length - 1; i += 1) {
      stringPhotos += `'${photos[i]}'`;
      stringPhotos += ',';
    }
    stringPhotos += `'${photos[photos.length - 1]}'`;
    stringPhotos += ']';
    query.text = `
      DO $do$
        DECLARE
          array_urls TEXT[]:= ARRAY ${stringPhotos};
          u VARCHAR;
        BEGIN
          FOREACH u IN ARRAY array_urls
          LOOP
            INSERT INTO photos(review_id, url) VALUES(${review_id}, u);
          END LOOP;
      END $do$;
    `;
    return pool.query(query);
  },

  createCharReview(characteristics) {
    const query = {
      name: 'create-review-char',
      text: '',
      values: [],
    };
    const charIds = Object.keys(characteristics);
    const charQueries = [];
    for (let i = 0; i < charIds.length; i += 1) {
      charQueries.push([characteristics[charIds[i]], parseInt(charIds[i], 10)]);
    }
    query.text = `
      DO $do$
        DECLARE
          array_chars INT[]:= array[${charQueries}];
          i INT[];
        BEGIN
          FOREACH i SLICE 1 IN ARRAY array_chars
          LOOP
          UPDATE join_characteristic_votes SET total_score = total_score + i[1],
                  total_votes = total_votes + 1
          WHERE char_join_id = i[2];
          END LOOP;
      END $do$;
    `;
    pool.query(query);
  },
};
