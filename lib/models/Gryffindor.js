const pool = require('../utils/pool');

class Gryffindor {
  id;
  first_name;
  last_name;

  constructor(row) {
    this.id = row.id;
    this.firstName = row.first_name;
    this.lastName = row.last_name;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * FROM gryffindor;
    `);
    return rows.map((row) => new Gryffindor(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM gryffindor
    WHERE id = $1
    `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Gryffindor(rows[0]);
  }

  static async updateById(id, newInfo) {
    const gryffindor = await Gryffindor.getById(id);
    if (!gryffindor) return null;
    const newGryffindor = { ...gryffindor, ...newInfo };
    const { rows } = await pool.query(
      `
    UPDATE gryffindor
    SET first_name = $2, last_name = $3
    WHERE id = $1
    RETURNING *;
    `,
      [id, newGryffindor.firstName, newGryffindor.lastName]
    );
    return new Gryffindor(rows[0]);
  }

  static async insert({ first_name, last_name }) {
    const { rows } = await pool.query(
      `
    INSERT INTO gryffindor (first_name, last_name)
    VALUES ($1, $2)
    RETURNING *
    `,
      [first_name, last_name]
    );
    return new Gryffindor(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
    DELETE from gryffindor
    WHERE id = $1
    RETURNING *
    `,
      [id]
    );
    return new Gryffindor(rows[0]);
  }
}

module.exports = { Gryffindor };
