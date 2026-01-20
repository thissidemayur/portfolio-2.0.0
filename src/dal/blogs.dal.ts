import { query } from "@/lib/db";
import { iBlog } from "@/types/database";

// get all blogs
export const getALlBlog = async({limit,offset}:{limit?:number,offset:number})=>{
    const sql = `
        SELECT * FROM blogs ORDER BY published_at DESC LIMIT $1 OFFSET $2
    `;
    const values = [limit || 100, offset];
    const {rows} = await query(sql,values);
    return rows;
}


// GET blog by slug
export const getBlogBySlug = async(slug:string) =>{
    const sql = `
        SELECT * FROM blogs WHERE slug = $1
    `;
    const {rows} = await query(sql,[slug]);
    return rows[0] || null;
}


// add a new blog
export const addNewBlog = async(blog:Omit<iBlog,'id' | 'published_at'>)=>{
    const sql = `
        INSERT INTO blogs (title, content, summary, image_url, slug, category, is_featured)
        values ($1,$2,$3,$4,$5,$6,$7)
        RETURNING id
    `;
    const values = [blog.title, blog.content, blog.summary, blog.image_url, blog.slug, blog.category, blog.is_featured];
    const {rows} = await query(sql,values);
    return rows[0]
}

// delete a blog
export const deleteBlog = async(id:number)=>{
    const sql = `
        DELETE FROM blogs WHERE id=$1
    `;
    const {rows} = await query(sql,[id])
    return rows[0];
}


// update a blog
export const updateBlog = async(id:number,blog:Partial<Omit<iBlog,'id' | 'published_at'>>)=>{
    // get actual key which is provided
    const keys = Object.keys(blog);
    if (keys.length === 0) return null;

    // construct set clause dynamically
    const setClause = keys.map((key,indx)=> `${key} = ${indx+1}`)

    // last placeholder for id
    const idPlaceholder = keys.length + 1;

    // final sql
    const sql = `
        UPDATE blogs SET ${setClause.join(', ')} WHERE id = $${idPlaceholder}
        RETURNING *
    `;

    const values = [...Object.values(blog),id]

    const {rows} = await query(sql,values);
    return rows[0];

}