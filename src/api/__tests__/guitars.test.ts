import supertest from 'supertest';
import app from '../../server.js';

beforeAll(async () => await app.ready());

afterAll(async () => await app.close());

describe('GET /', () => {
  test('returns a 200 and an array of guitars', async () => {
    const response = await supertest(app.server).get('/');
    expect(response.status).toEqual(200);
    expect(response.body.guitars).toBeInstanceOf(Array);
  });
});

describe('POST /', () => {
  test('returns a 200 and returns saved guitar', async () => {
    const guitar = {
      color: 'red',
      name: 'date: ' + Date.now(),
      model: 'telecaster',
      manufacturer: 'fender',
    };
    const response = await supertest(app.server).post('/').send(guitar);
    expect(response.status).toEqual(200);
    expect(response.body.guitar).toEqual(guitar);
  });
});
