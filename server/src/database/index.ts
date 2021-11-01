import { Client } from "pg";

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "dashfinances",
});

client.connect();

const db = async (query, values): Promise<any[][]> => {
  const { rows } = await client.query(query, values);
  return rows;
};

export { db };
