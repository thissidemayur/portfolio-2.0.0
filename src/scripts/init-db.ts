import path from "path";
import { Pool } from "pg";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

async function createDatabaseIfNotExists() {
  // Connect to the 'postgres' maintenance database first
  const adminUrl = process.env.DATABASE_URL!.replace(
    /\/portfolio_db(\?.*)?$/,
    "/postgres$1",
  );
  const adminPool = new Pool({ connectionString: adminUrl });

  try {
    const client = await adminPool.connect();
    const checkRes = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = 'portfolio_db'",
    );

    if (checkRes.rowCount === 0) {
      console.log("🚀 Creating database 'portfolio_db'...");
      await client.query("CREATE DATABASE portfolio_db");
      console.log("✅ Database 'portfolio_db' created successfully.");
    } else {
      console.log("ℹ️ Database 'portfolio_db' already exists.");
    }
    client.release();
  } catch (err) {
    console.error("❌ Failed to ensure database existence:", err);
    process.exit(-1);
  } finally {
    await adminPool.end();
  }
}

async function runInitialization() {
  // 1. Ensure DB exists before trying to connect the main pool
  await createDatabaseIfNotExists();

  // 2. Initialize the main pool ONLY after we are sure the DB exists
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
  });

  console.log("🛠️ Initializing schema and seed...");
  const client = await pool.connect();

  try {
    // Run Schema
    const schemaPath = path.join(process.cwd(), "src/sql/schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf8");
    await client.query(schemaSql);
    console.log("✅ Schema applied.");

    // Run Seed
    const seedPath = path.join(process.cwd(), "src/sql/seed.sql");
    const seedSql = fs.readFileSync(seedPath, "utf8");
    await client.query(seedSql);
    console.log("✅ Seed data inserted.");

    console.log("✨ Mayur_OS Database is now System_Ready!");
  } catch (error) {
    console.error("❌ Initialization failed!!");
    console.error(error);
    process.exit(-1);
  } finally {
    client.release();
    await pool.end();
    console.log("🔌 Connection closed.");
  }
}

// Top-level await (ensure your ts-node config supports this)
runInitialization();
