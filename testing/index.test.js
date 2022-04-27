const app = require('../server/app.js');
const supertest = require('supertest');

const request = supertest(app);

jest.setTimeout(10000);

it('GET request for all reviews for a product', async () => {
  const response = await request.get('/reviews')
    .query({ product_id: 65666 });
  await expect(response.status).toBe(200);
});
