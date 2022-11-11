const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('tests to interact with Slytherin routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /slytherins will return list of slytherins', async () => {
    const resp = await request(app).get('/slytherins');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "firstName": "Draco",
          "id": "1",
          "lastName": "Malfoy",
        },
        Object {
          "firstName": "Salazar",
          "id": "2",
          "lastName": "Slytherin",
        },
        Object {
          "firstName": "Severus",
          "id": "3",
          "lastName": "Snape",
        },
        Object {
          "firstName": "Tom",
          "id": "4",
          "lastName": "Riddle",
        },
        Object {
          "firstName": "Horace",
          "id": "5",
          "lastName": "Slughorn",
        },
      ]
    `);
  });
});
