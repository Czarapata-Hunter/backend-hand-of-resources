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
}

module.exports = { Slytherin };
