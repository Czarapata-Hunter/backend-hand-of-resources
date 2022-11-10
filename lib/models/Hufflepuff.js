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

  static async insert({ first_name, last_name }) {
    const { rows } = await pool.query(
      `
    INSERT INTO hufflepuff (first_name, last_name)
    VALUES ($1, $2)
    RETURNING *
    `,
      [first_name, last_name]
    );
    return new Hufflepuff(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
    DELETE from hufflepuff
    WHERE id = $1
    RETURNING *
    `,
      [id]
    );
    return new Hufflepuff(rows[0]);
  }

  static async updateById(id, newLastName) {
    const hufflepuff = await Hufflepuff.getHufflepuffsById(id);
    if (!hufflepuff) return null;
    const newHufflepuff = { ...hufflepuff, ...newLastName };
    const { rows } = await pool.query(
      `
    UPDATE hufflepuff
    SET first_name = $2, last_name = $3
    WHERE id = $1
    RETURNING *;
    `,
      [id, newHufflepuff.firstName, newHufflepuff.lastName]
    );
    return new Hufflepuff(rows[0]);
  }
}

module.exports = { Hufflepuff };
