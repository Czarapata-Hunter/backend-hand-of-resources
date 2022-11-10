const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('tests to interact with Gryffindor routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /gryffindors should return list of gryffindors', async () => {
    const resp = await request(app).get('/gryffindors');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "firstName": "Harry",
          "id": "1",
          "lastName": "Potter",
        },
        Object {
          "firstName": "Ron",
          "id": "2",
          "lastName": "Weasley",
        },
        Object {
          "firstName": "Hermione",
          "id": "3",
          "lastName": "Granger",
        },
        Object {
          "firstName": "Neville",
          "id": "4",
          "lastName": "Longbottom",
        },
        Object {
          "firstName": "Ginny",
          "id": "5",
          "lastName": "Weasley",
        },
      ]
    `);
  });

  it('GET gryffindors/:id should return one Gryffindor', async () => {
    const resp = await request(app).get('/gryffindors/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "firstName": "Harry",
        "id": "1",
        "lastName": "Potter",
      }
    `);
  });

  it('PUT /gryffindors/:id will update a preexisting gryffindor', async () => {
    const resp = await request(app).put('/gryffindors/1').send({
      firstName: 'James',
    });
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "firstName": "James",
        "id": "1",
        "lastName": "Potter",
      }
    `);
  });

  it('POST /gryffindors should create a new gryffindor', async () => {
    const newGryffindor = {
      first_name: 'Lily',
      last_name: 'Potter',
    };
    const resp = await request(app).post('/gryffindors').send(newGryffindor);
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "firstName": "Lily",
        "id": "6",
        "lastName": "Potter",
      }
    `);
  });

  afterAll(() => {
    pool.end();
  });
});
