const pool = require('../utils/pool');

class Ravenclaw {
  id;
  name;
  wand_model;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.wandModel = row.wand_model;
  }

  static async getAll() {
    const { rows } = await pool.query(`
        SELECT * FROM ravenclaw
        `);
    return rows.map((row) => new Ravenclaw(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM ravenclaw
    WHERE id = $1
    `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Ravenclaw(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
    DELETE from ravenclaw
    WHERE id = $1
    RETURNING *
    `,
      [id]
    );
    return new Ravenclaw(rows[0]);
  }
}

module.exports = { Ravenclaw };
