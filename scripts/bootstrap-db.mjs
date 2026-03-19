import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import pg from "pg";

const { Client } = pg;

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = resolve(__dirname, "../supabase/schema.sql");

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required to bootstrap the database.");
}

const sql = await readFile(schemaPath, "utf8");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 4000,
  ssl: {
    rejectUnauthorized: false
  }
});

try {
  await client.connect();
  await client.query(sql);
  console.log("Database bootstrapped successfully.");
} finally {
  await client.end();
}
