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

  it('GET slytherins/:id should return a single Slytherin', async () => {
    const resp = await request(app).get('/slytherins/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "firstName": "Draco",
        "id": "1",
        "lastName": "Malfoy",
      }
    `);
  });

  it('PUT /slytherins/:id will update an existing slytherin', async () => {
    const resp = await request(app).put('/slytherins/1').send({
      lastName: 'DragonBoy',
    });
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "firstName": "Draco",
        "id": "1",
        "lastName": "DragonBoy",
      }
    `);
  });
});
