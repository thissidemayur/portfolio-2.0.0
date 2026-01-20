import path from "path"
import pg from "pg"
import { Pool } from "pg"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config({path: ".env.local"})
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

pool.on("error",(err,client)=>{
    console.error("Unexpected error on idle client",err)
    process.exit(-1)
})

async function runInitialization() {
    console.log("🛠️ Initializing database...");
    const client = await pool.connect();

    try {
        // run schema
        const schemaPath = path.join(process.cwd(),"src/sql/schema.sql")
        const schemaSql = fs.readFileSync(schemaPath,"utf8")
        await client.query(schemaSql)
        console.log("✅ Schema created.");

        // run seed
        const seedSql = fs.readFileSync(path.join(process.cwd(),"src/sql/seed.sql"),"utf8")
        await client.query(seedSql)
        console.log("✅ Seed data inserted.");

        console.log("✨ Database is now structured and populated!");

    } catch (error) {
        console.error("❌ Initialization failed!!");
        console.error(error);
        process.exit(-1);
    } finally {
        client.release();
        await pool.end();
        console.log("🔌 Connection closed!!");
    }
}

 runInitialization()