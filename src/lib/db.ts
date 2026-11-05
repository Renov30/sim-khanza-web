import mysql from "mysql2/promise";

declare global {
  // eslint-disable-next-line no-var
  var _mysqlPool: mysql.Pool | undefined;
}

const dbConfig: mysql.PoolOptions = {
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "sik_mitra",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
};

export const pool = global._mysqlPool || mysql.createPool(dbConfig);

if (process.env.NODE_ENV !== "production") {
  global._mysqlPool = pool;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function executeQuery<T = unknown>(
  sql: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any[]
): Promise<T[]> {
  const [rows] = await pool.execute(sql, params);
  return rows as T[];
}

export async function checkDatabaseConnection(): Promise<{
  connected: boolean;
  database: string;
  host: string;
  error?: string;
}> {
  try {
    await pool.query("SELECT 1");
    return {
      connected: true,
      database: dbConfig.database as string,
      host: `${dbConfig.host}:${dbConfig.port}`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal terhubung ke MySQL";
    return {
      connected: false,
      database: dbConfig.database as string,
      host: `${dbConfig.host}:${dbConfig.port}`,
      error: message,
    };
  }
}
