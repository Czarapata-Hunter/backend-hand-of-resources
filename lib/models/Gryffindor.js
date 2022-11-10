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
}

module.exports = { Gryffindor };
