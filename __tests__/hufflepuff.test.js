const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('Hufflepuffs routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /hufflepuffs will return list of hufflepuffs', async () => {
    const resp = await request(app).get('/hufflepuffs');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "firstName": "Cedric",
          "id": "1",
          "lastName": "Diggory",
        },
        Object {
          "firstName": "Helga",
          "id": "2",
          "lastName": "Hufflepuff",
        },
        Object {
          "firstName": "Newt",
          "id": "3",
          "lastName": "Scamander",
        },
        Object {
          "firstName": "Pamona",
          "id": "4",
          "lastName": "Sprout",
        },
        Object {
          "firstName": "Bridget",
          "id": "5",
          "lastName": "Wenlock",
        },
      ]
    `);
  });

  it('GET hufflepuffs/:id should display one Hufflepuff row', async () => {
    const resp = await request(app).get('/hufflepuffs/5');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "firstName": "Bridget",
        "id": "5",
        "lastName": "Wenlock",
      }
    `);
  });
});
