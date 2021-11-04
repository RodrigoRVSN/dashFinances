"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancesRepository = void 0;
const database_1 = require("../database");
class FinancesRepositoryClass {
    async create({ name, category, amount, userToken }) {
        const [row] = await database_1.db(`
      INSERT INTO finances(name, category, amount, user_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [name, category, amount, userToken]);
        return row;
    }
    async findById(id) {
        const [row] = await database_1.db(`
      SELECT *
      FROM finances
      WHERE id = $1
    `, [id]);
        return row;
    }
    async getAll({ userToken, orderBy }) {
        const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
        const row = await database_1.db(`
       SELECT * 
       FROM finances
       WHERE user_id = $1
       ORDER BY name ${direction}
      `, [userToken]);
        return row;
    }
    async update(id, { name, category, amount }) {
        const [row] = await database_1.db(`
      UPDATE finances 
      SET name = $1, category = $2, amount = $3
      WHERE id = $4  
      RETURNING *
    `, [name, category, amount, id]);
        return row;
    }
    async delete(id) {
        const deleteRow = await database_1.db(`
      DELETE 
      FROM finances
      WHERE id=$1
    `, [id]);
        return deleteRow;
    }
}
exports.FinancesRepository = new FinancesRepositoryClass();
