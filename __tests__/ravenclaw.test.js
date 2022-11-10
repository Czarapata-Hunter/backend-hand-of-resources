const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('Ravenclaws routes and tests', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /ravenclaws will return the list of ravenclaw members and wands', async () => {
    const resp = await request(app).get('/ravenclaws');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "name": "Luna Lovegood",
          "wandModel": "20101",
        },
        Object {
          "id": "2",
          "name": "Rowena Ravenclaw",
          "wandModel": "40568",
        },
        Object {
          "id": "3",
          "name": "Garrick Olivander",
          "wandModel": "19385",
        },
        Object {
          "id": "4",
          "name": "Filius Flitwick",
          "wandModel": "69303",
        },
        Object {
          "id": "5",
          "name": "Gilderoy Lockhart",
          "wandModel": "49605",
        },
      ]
    `);
  });

  it('GET /ravenclaws/:id will return one Ravenclaw by their id', async () => {
    const resp = await request(app).get('/ravenclaws/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "id": "1",
        "name": "Luna Lovegood",
        "wandModel": "20101",
      }
    `);
  });
});
