const pool = require('../utils/pool');

class DeathEater {
  id;
  name;
  douchery_level;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.doucheryLevel = row.douchery_level;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * FROM death_eaters;
    `);
    return rows.map((row) => new DeathEater(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM death_eaters
    WHERE id = $1
    `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new DeathEater(rows[0]);
  }
}

module.exports = { DeathEater };
