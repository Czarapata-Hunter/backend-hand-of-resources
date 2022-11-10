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
}

module.exports = { Hufflepuff };
