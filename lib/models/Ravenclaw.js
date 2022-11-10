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
}

module.exports = { Ravenclaw };
