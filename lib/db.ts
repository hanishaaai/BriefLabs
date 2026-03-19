import { Pool, type QueryResultRow } from "pg";

import { env } from "@/lib/env";

declare global {
  // eslint-disable-next-line no-var
  var __lumiaPool: Pool | undefined;
}

export function getPool() {
  if (!env.databaseUrl) {
    return null;
  }

  if (!global.__lumiaPool) {
    global.__lumiaPool = new Pool({
      connectionString: env.databaseUrl,
      connectionTimeoutMillis: 4000,
      idleTimeoutMillis: 10000,
      max: 3,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }

  return global.__lumiaPool;
}

export async function query<T extends QueryResultRow>(
  sql: string,
  params: unknown[] = []
) {
  const pool = getPool();

  if (!pool) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const result = await pool.query<T>(sql, params);
  return result.rows;
}
