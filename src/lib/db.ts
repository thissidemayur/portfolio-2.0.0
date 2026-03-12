// lib/db.ts
import { Pool, PoolConfig } from "pg";

const isProduction = process.env.NODE_ENV === "production";
const isLocalDb =
  process.env.DATABASE_URL?.includes("localhost") ||
  process.env.DATABASE_URL?.includes("127.0.0.1");

const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction && !isLocalDb ? { rejectUnauthorized: false } : false,

  max: 10, // Lower this — Supabase free tier caps at 15 total
  min: 0, // Don't hold idle connections open

  // Keep these BELOW Supabase's pooler idle timeout (~5s on free tier)
  idleTimeoutMillis: 4000, // ← was 30000, way too long
  connectionTimeoutMillis: 15000, // ← increase for cold cache starts

  // Critical: Supabase kills idle connections; tell pg not to trust them
  allowExitOnIdle: true,
};

const globalForPg = global as unknown as { pgPool: Pool | undefined };

export const pool: Pool = globalForPg.pgPool ?? new Pool(poolConfig);

if (process.env.NODE_ENV !== "production") globalForPg.pgPool = pool;

pool.on("error", (err) => {
  const code = (err as NodeJS.ErrnoException).code;
  if (code === "ECONNRESET" || code === "ETIMEDOUT") return; // transient
  console.error("[db] Fatal pool error:", err.message);
});

export const query = async (text: string, params?: any[]) => {
  return pool.query(text, params);
};
