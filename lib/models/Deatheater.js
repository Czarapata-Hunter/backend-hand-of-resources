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

  static async updateById(id, newInfo) {
    const deatheater = await DeathEater.getById(id);
    if (!deatheater) return null;
    const newDeatheater = { ...deatheater, ...newInfo };
    const { rows } = await pool.query(
      `UPDATE death_eaters
      SET name = $2, douchery_level = $3
      WHERE id = $1
      RETURNING *;
      `,
      [id, newDeatheater.name, newDeatheater.doucheryLevel]
    );
    return new DeathEater(rows[0]);
  }
}

module.exports = { DeathEater };
