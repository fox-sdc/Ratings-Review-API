/* eslint-disable camelcase */
const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
});

module.exports = {

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

  getMetaData(product_id) {
    const query = {
      name: 'get-meta-data',
      text: '',
      values: [],
    };
    query.values = [product_id];
    query.text = `
      SELECT
        (SELECT meta
          FROM (
            SELECT
                JSON_BUILD_OBJECT(
                  '1', meta.rating_1,
                  '2', meta.rating_2,
                  '3', meta.rating_3,
                  '4', meta.rating_4,
                  '5', meta.rating_5
                ) AS meta
              FROM meta
              WHERE meta.product_id = $1
            ) AS meta
          ) ratings,

          (SELECT meta
            FROM (
              SELECT
                  JSON_BUILD_OBJECT(
                    'false', meta.recommended_false_vote,
                    'true', meta.recommended_true_vote
                  ) AS meta
                FROM meta
                WHERE meta.product_id = $1
              ) AS meta
            ) AS recommended,

            (SELECT *
            FROM (
              SELECT
                JSON_OBJECT_AGG((characteristics.characteristic_name),
                  JSON_BUILD_OBJECT(
                    'id', join_characteristic_votes.char_join_id,
                    'value', join_characteristic_votes.total_score::decimal / join_characteristic_votes.total_votes
                  )
                ) AS test1
              FROM join_characteristic_votes
              JOIN characteristics ON (join_characteristic_votes.characteristic_id = characteristics.characteristics_id)
              WHERE join_characteristic_votes.product_id = $1
              ) AS test2
            ) AS characteristics
            FROM join_characteristic_votes
            JOIN characteristics ON (join_characteristic_votes.characteristic_id = characteristics.characteristics_id)
            GROUP BY characteristic_id
          ;
        `;
    return pool.query(query);
  },
};
