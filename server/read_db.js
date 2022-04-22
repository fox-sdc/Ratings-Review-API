// eslint-disable-next-line import/extensions
const pool = require('./db.js');

const queryString = `
SELECT *
FROM reviews
LIMIT 5;
`;

const queryTest = pool
  .query(queryString)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    pool.end();
  });

module.exports.queryTest = queryTest;
