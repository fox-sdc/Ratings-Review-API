// eslint-disable-next-line import/extensions
const app = require('./app.js');
require('dotenv').config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
