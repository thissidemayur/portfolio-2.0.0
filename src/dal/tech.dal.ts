import { query } from "@/lib/db";
import { iTech } from "@/types/database";



// get skills grouped by category
export const getSkillsByCategory = async()=>{
    const sql = `
        SELECT category, json_agg(json_build_object(
            'id', id,
            'name', name,
            'icon_slug', icon_slug,
            'is_main_stack', is_main_stack
        )) as skills 
        FROM technologies
        GROUP BY category;
    `;

    const { rows } = await query(sql);
    return rows
}

// add a new technology
export const addTechnology = async(tech:Omit<iTech,'id'>)=>{
    const sql = `
        INSERT INTO technologies (name,category,icon_slug,is_main_stack)
        VALUES ($1,$2,$3,$4)
        RETURNING *;
    `;

    const values = [tech.name, tech.category, tech.icon_slug, tech.is_main_stack];
    const { rows } = await query(sql, values);
    return rows[0];
}

// get all technologies
export const getAllTechnologies = async()=>{
    const sql = `SELECT * FROM technologies `;
    const { rows } = await query(sql);
    return rows;
}

// get main stack technologies
export const getMainStackTechnologies = async()=>{
    const sql = `SELECT * FROM technologies WHERE is_main_stack = true `;
    const { rows } = await query(sql);
    return rows;
}

// delete a technology by id
export const deleteTechnologyById = async(id:number)=>{
    const sql = `
        DELETE FROM technologies WHERE id=$1
    `;
    const { rows } = await query(sql,[id]);
    return rows[0];
}

// update a technology by id
export const updateTechnologyById = async(id:number,tech:Partial<Omit<iTech,'id'>>)=>{
   
    const key = Object.keys(tech);
    if (key.length ===0){
        return null;
    }

    // build dynamic set clause
    const dynamicSetClause = key.map((k,i)=>`${k}=$${i+1}`).join(', ');

    const sql = `
        UPDATE technologies SET ${dynamicSetClause} WHERE id=$${key.length +1} RETURNING *;
    `;

    const values = [...Object.values(tech),id];
    const { rows } = await query(sql,values);
    return rows[0];
}

