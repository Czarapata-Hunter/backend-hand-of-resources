const pool = require('../utils/pool');

class Hufflepuff {
  id;
  first_name;
  last_name;

  constructor(row) {
    this.id = row.id;
    this.firstName = row.first_name;
    this.lastName = row.last_name;
  }

  static async getAllHufflepuffs() {
    const { rows } = await pool.query(`
        SELECT * FROM hufflepuff
        `);
    return rows.map((row) => new Hufflepuff(row));
  }

  static async getHufflepuffsById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM hufflepuff
    WHERE id = $1
    `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Hufflepuff(rows[0]);
  }
}

module.exports = { Hufflepuff };
