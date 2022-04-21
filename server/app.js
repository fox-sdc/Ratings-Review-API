import express from 'express';

const app = express();

// eslint-disable-next-line no-unused-vars
app.get('/', (req, res) => {
  res.send('Hello world');
});

export default app;
