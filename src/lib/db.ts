import { Pool, PoolConfig } from "pg";

const poolConfig: PoolConfig = {
    connectionString:process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
}

// prevent creating multiple instances of Pool in development(hot reloading)
const globalForPg = global as unknown as {pgPool:Pool | undefined} 

// initalize the pg Pool only once
export const pool:Pool = globalForPg.pgPool ?? new Pool(poolConfig)

if (process.env.NODE_ENV !== "production") globalForPg.pgPool = pool

pool.on("error",(err,client)=>{
    console.error("Unexpected error on idle client!!")
    console.error(err)
    process.exit(-1)
})

// export a query method to execute queries- it handle connect/execute/release internally
export const query = async(text:string,params?:any[])=>{
    return pool.query(text,params)
}