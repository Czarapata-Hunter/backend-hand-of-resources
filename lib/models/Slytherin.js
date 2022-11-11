const pool = require('../utils/pool');

class Slytherin {
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
        SELECT * FROM slytherin;
        `);
    return rows.map((row) => new Slytherin(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM slytherin
    WHERE id = $1
    `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Slytherin(rows[0]);
  }

  static async updateById(id, newName) {
    const slytherin = await Slytherin.getById(id);
    if (!slytherin) return null;
    const newSlytherin = { ...slytherin, ...newName };
    const { rows } = await pool.query(
      `
    UPDATE slytherin
    SET first_name = $2, last_name = $3
    WHERE id = $1
    RETURNING *;
    `,
      [id, newSlytherin.firstName, newSlytherin.lastName]
    );
    return new Slytherin(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM slytherin
    WHERE id = $1
    RETURNING *
    `,
      [id]
    );
    return new Slytherin(rows[0]);
  }
}

module.exports = { Slytherin };
