// eslint-disable-next-line import/extensions
const app = require('./app.js');
require('dotenv').config();

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on  http://localhost:${process.env.PORT}`);
});
