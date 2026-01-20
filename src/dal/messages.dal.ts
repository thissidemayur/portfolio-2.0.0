import { query } from "@/lib/db";
import { IMsg } from "@/types/database";

// get all messages
export async function getMessages() {
    const sql = `
        SELECT * FROM contact_messages  ORDER BY received_at DESC
    `;
    const {rows} = await query(sql)
    return rows;
}

// mark us read
export async function markMessageRead(id:number){
    const sql = `
    UPDATE contact_messages SET is_read = true  WHERE id=$1
    RETURNING *
    `;
    const {rows} = await query(sql,[id])
    return rows[0] 
}

// save a message
export async function saveContactMessage({name,email,subject,message}:IMsg){
    const sql = `
        INSERT INTO contact_messages (name,email,subject,message) 
        VALUES ($1,$2,$3,$4)
    `
    const values = [name,email,subject,message];
    const {rows} = await query(sql,values)
    return rows[0]
}

// delete a message 
export async function deleteMessage(id:number){
    const sql = `
        DELETE FROM contact_messages WHERE id=$1
    `;
    const {rows} = await query(sql,[id])
    return rows[0];
}