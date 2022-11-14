const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('test to interact with Deatheaters routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /deatheaters will return whole list of deatheaters', async () => {
    const resp = await request(app).get('/deatheaters');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "doucheryLevel": "100",
          "id": "1",
          "name": "Lord Voldemort",
        },
        Object {
          "doucheryLevel": "74",
          "id": "2",
          "name": "Bellatrix Lestrange",
        },
        Object {
          "doucheryLevel": "52",
          "id": "3",
          "name": "Lucius Malfoy",
        },
        Object {
          "doucheryLevel": "10",
          "id": "4",
          "name": "Pius Thicknesse",
        },
        Object {
          "doucheryLevel": "2",
          "id": "5",
          "name": "Stan Shunpike",
        },
      ]
    `);
  });

  it('GET /deatheaters/:id should return one Deatheater', async () => {
    const resp = await request(app).get('/deatheaters/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "doucheryLevel": "100",
        "id": "1",
        "name": "Lord Voldemort",
      }
    `);
  });

  it('PUT /deatheaters/:id will update an existing deatheater', async () => {
    const resp = await request(app).put('/deatheaters/1').send({
      doucheryLevel: 99,
    });
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "doucheryLevel": "99",
        "id": "1",
        "name": "Lord Voldemort",
      }
    `);
  });

  it('DELETE /deatheaters/:id will delete a Deatheater', async () => {
    const resp = await request(app).delete('/deatheaters/1');
    expect(resp.status).toBe(200);
    const deatheaterResp = await request(app).get('/deatheaters/1');
    expect(deatheaterResp.status).toBe(404);
  });

  it('POST /deatheaters should create a new Deatheater', async () => {
    const newDeatheater = {
      name: 'Geo',
      douchery_level: 0,
    };
    const resp = await request(app).post('/deatheaters').send(newDeatheater);
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "doucheryLevel": "0",
        "id": "6",
        "name": "Geo",
      }
    `);
  });

  afterAll(() => {
    pool.end();
  });
});
