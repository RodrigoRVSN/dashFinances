import { db } from "../database";

class UsersRepositoryClass {
  async create({ name, email, password }) {
    const created = new Date();

    const [row] = await db(
      `
      INSERT INTO users(name, email, password, created)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `,
      [name, email, password, created],
    );

    return row;
  }

  async findById(id) {
    const [row] = await db(
      `
      SELECT id, name, email
      FROM users
      WHERE id = $1
    `,
      [id],
    );

    return row;
  }

  async findByEmail(email) {
    const [row] = await db(
      `
        SELECT * 
        FROM users 
        WHERE email = $1
      `,
      [email],
    );
    return row;
  }
}

export const UsersRepository = new UsersRepositoryClass();
