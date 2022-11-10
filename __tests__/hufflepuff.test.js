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
    const resp = await request(app).get('/hufflepuffs/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "firstName": "Cedric",
        "id": "1",
        "lastName": "Diggory",
      }
    `);
  });

  it('POST /hufflepuffs should create new hufflepuff', async () => {
    const newHufflepuff = {
      first_name: 'Matt',
      last_name: 'Smith',
    };
    const resp = await request(app).post('/hufflepuffs').send(newHufflepuff);
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "firstName": "Matt",
        "id": "6",
        "lastName": "Smith",
      }
    `);
  });

  it('DELETE /hufflepuffs/:id will remove a Hufflepuff', async () => {
    const resp = await request(app).delete('/hufflepuffs/1');
    expect(resp.status).toBe(200);
    const hufflepuffRemoval = await request(app).get('/hufflepuffs/1');
    expect(hufflepuffRemoval.status).toBe(404);
  });

  it('PUT /hufflepuffs/:id should update an existing Hufflepuff', async () => {
    const resp = await request(app).put('/hufflepuffs/1').send({
      lastName: 'Czarapata',
    });
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "firstName": "Cedric",
        "id": "1",
        "lastName": "Czarapata",
      }
    `);
  });

  afterAll(() => {
    pool.end();
  });
});
