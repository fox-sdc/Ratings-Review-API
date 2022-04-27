import http from 'k6/http';
import { sleep, check } from 'k6';
import { URLSearchParams } from 'https://jslib.k6.io/url/1.0.0/index.js';

export const options = {
  vus: 40,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<50'], // 95% of requests should be below 200ms
  },
};

export default () => {
  const BASE_URL = 'http://localhost:3000/reviews';
  const PRODUCT_ID = 65666;
  const REVIEW_ID = 378809;

  const searchParams = new URLSearchParams([
    ['product_id', `${PRODUCT_ID}`],
  ]);

  const req1 = {
    method: 'GET',
    url: `${BASE_URL}?${searchParams}`,
    body: null,
  };
  const req2 = {
    method: 'GET',
    url: `${BASE_URL}/meta?${searchParams}`,
    body: null,
  };
  const req3 = {
    method: 'PUT',
    url: `${BASE_URL}/${REVIEW_ID}/helpful`,
    body: null,
    params: {},
  };
  const req4 = {
    method: 'PUT',
    url: `${BASE_URL}/${REVIEW_ID}/report`,
    body: null,
    params: {},
  };

  const res = http.batch([req1, req2, req3, req4]);

  check(res[0], {
    'GET reviews request is status 200': (r) => r.status === 200,
  });

  check(res[1], {
    'GET meta request is status 200': (r) => r.status === 200,
  });

  check(res[2], {
    'PUT helpful request is status 204': (r) => r.status === 204,
  });

  check(res[3], {
    'PUT report request is status 204': (r) => r.status === 204,
  });
  sleep(1);
};

// Possible load testing for POST request but not used

// const payload = {
//   product_id: 65666,
//   rating: 5,
//   summary: 'load test',
//   body: 'test test rtest',
//   recommend: false,
//   name: 'alexc',
//   email: 'alexc@gmail.com',
//   photos: ['dbjdnfjnvfvjnfjvnfjvn', 'vfnvnfvjnfvjnfjvnjfnvjfnvjfn'],
//   characteristics: {
//     219482: 4,
//   },
// };

// const req5 = {
//   method: 'POST',
//   url: `${BASE_URL}`,
//   body: JSON.stringify(payload),
//   params: { headers: requestHeaders },
// };
