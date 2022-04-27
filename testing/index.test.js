/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
const supertest = require('supertest');
const app = require('../server/app.js');

const request = supertest(app);

jest.setTimeout(10000);
describe('Ratings-Reviews API', () => {
  const product_id = 65666;
  const review_id = 5776793;

  describe('GET request tests', () => {
    it('Should return a 200 code if reviews recevied for valid product id', async () => {
      const response = await request.get('/reviews')
        .query({ product_id });
      await expect(response.statusCode).toBe(200);
    });

    it('Should return reviews for valid product id', async () => {
      const response = await request.get('/reviews')
        .query({ product_id });
      await expect(response.body.results).not.toBe(0);
    });

    it('Should return page 1 of reviews by default', async () => {
      const response = await request.get('/reviews')
        .query({ product_id });
      await expect(response.body.page).toBe(0);
    });

    it('Should return 5 reviews by default', async () => {
      const response = await request.get('/reviews')
        .query({ product_id });
      await expect(response.body.results).toHaveLength(5);
    });

    it('Should return a 200 code if meta info recevied for valid product id', async () => {
      const response = await request.get('/reviews/meta')
        .query({ product_id });
      await expect(response.statusCode).toBe(200);
    });
  });

  describe('PUT request tests', () => {
    it('Should return a 204 code if helpfulness was increased for valid review_id', async () => {
      const response = await request.put(`/reviews/${review_id}/helpful`);
      await expect(response.statusCode).toBe(204);
    });

    it('Should return a 204 code if review successfully reported', async () => {
      const response = await request.put(`/reviews/${review_id}/report`);
      await expect(response.statusCode).toBe(204);
    });
  });
});
