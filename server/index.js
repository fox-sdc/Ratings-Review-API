// eslint-disable-next-line import/extensions
import app from './app.js';
import 'dotenv/config';

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on  http://localhost:${process.env.PORT}`);
});
