import { Client } from "pg";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

const db = async (query, values): Promise<any[][]> => {
  const { rows } = await client.query(query, values);
  return rows;
};

export { db };
