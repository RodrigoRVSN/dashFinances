"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const database_1 = require("../database");
class UsersRepositoryClass {
    async create({ name, email, password }) {
        const [row] = await database_1.db(`
      INSERT INTO users(name, email, password)
      VALUES($1, $2, $3)
      RETURNING *
    `, [name, email, password]);
        return row;
    }
    async findById(id) {
        const [row] = await database_1.db(`
      SELECT id, name, email
      FROM users
      WHERE id = $1
    `, [id]);
        return row;
    }
    async findByEmail(email) {
        const [row] = await database_1.db(`
        SELECT * 
        FROM users 
        WHERE email = $1
      `, [email]);
        return row;
    }
}
exports.UsersRepository = new UsersRepositoryClass();
