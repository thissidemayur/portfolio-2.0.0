import { query } from "@/lib/db";
import { iProject } from "@/types/database";
import { cacheTag } from "next/cache";

// get all projects with their tech stack
export const getAllProjects = async() => {
    const sql = `
        SELECT p.* ,ARRAY_AGG(t.name) as tech_stack FROM projects p 
        LEFT JOIN project_technologies pt ON p.id =pt.project_id
        LEFT JOIN Technologies t ON pt.technology_id = t.id
        GROUP BY p.id
        ORDER BY p.id DESC
        `;
        const {rows} = await query(sql)
        return rows
}


// get project by id with its tech stack
export const getProjectByItSlug = async(slug:string)=>{
    const sql = `
        SELECT p.* , ARRAY_AGG(t.name) AS tech_stack FROM projects p 
        LEFT JOIN project_technologies pt ON pt.project_id = p.id
        LEFT JOIN technologies t On t.id = pt.technology_id
        WHERE p.slug = $1
        GROUP BY p.id
    `;
    const {rows} = await query(sql,[slug])
    return rows[0] || null;
}


// update project details (with add or minus technology)
export const updateProjectDetails = async(id:number,details:Partial<Omit<iProject,'id'>> & {techIds?:number[]})=>{

    await query('BEGIN');
    try {
        const {techIds, ...projectFields  } = details

        const keys = Object.keys(projectFields)

        // update project table
        if(keys.length > 0 ) {
            const setClause = keys.map((k,i) => `${k} = $${i+1}`).join(", ")
            const sql = `UPDATE projects SET ${setClause} WHERE id = $${keys.length+1}`
            await query(sql, [...Object.values(projectFields),id])
        }
        // delete all the re-insert new list
        if(techIds !== undefined) {
            await query(`DELETE FROM project_technologies WHERE project_id = $1`,[id])

            if (techIds.length>0) {
                const placeholders = techIds.map((_,i)=>`($1, $${i+2})`).join(", ")
                const bridgeSQL = `INSERT INTO project_technologies (project_id, technology_id) VALUES ${placeholders} RETURNING *`;
                const {rows} = await query(bridgeSQL,[id,...techIds])
            }

        }
        await query('COMMIT')
        return {id}
        
    } catch (error) {
        await query('ROLLBACK')
        console.error("Error while updating project!!")
        console.error(error)
        throw error;
    }
    
}

// delete project 
export const deleteProject = async(id:number)=>{
    await query('BEGIN')
    try {
        // delete the link first
        await query("DELETE FROM project_technologies WHERE project_id = $1", [id]);        
        // delete the project
        const sql = `DELETE FROM projects WHERE id = $1 RETURNING id,slug`
        const {rows} = await query(sql,[id])
        await query('COMMIT')
        return rows[0]

    } catch (error) {
        await query('ROLLBACK')
        console.error(`Error while deleting the project!! `)
        console.error(error)
        throw error
    }
}

// create new project
export const createProject = async(details:Omit<iProject,'id'|'created_at'>,techIds:number[])=>{
    // transaction start
    await query('BEGIN')
    try {
        // create project
        const projectSql = `
            INSERT INTO Projects 
            (title, content, summary, image_url, live_url, repo_url, slug, is_featured, problem_statement, solution_approach, key_learnings, challenges_faced)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
            RETURNING id
            `;
        const projectValues = [
            details.title,
            details.content,
            details.summary,
            details.image_url,
            details.live_url || null,
            details.repo_url,
            details.slug,
            details.is_featured,
            details.problem_statement,
            details.solution_approach,
            details.key_learnings,
            details.challenges_faced
        ];
        const {rows} = await query(projectSql,projectValues)
        const projectId = rows[0].id;


        // link the technologies
        if (techIds && techIds.length > 0) {
            // genereate placeholders
            const placeholders = techIds.map(
              (_, index) => `($1, $${ index + 2})`
            ).join(", ");

            const bridgeSql = `
                INSERT INTO project_technologies (project_id,technology_id)
                VALUES ${placeholders}
            `;

            await query(bridgeSql,[projectId,...techIds])
            
        }
        await query('COMMIT')
        return projectId;
        
    } catch (error) {
        await query('ROLLBACK')
        console.error('Error creating project:', error);
        throw error;
    }

}

export const getProjectById = async (id: number) => {
    if (isNaN(id) || id <= 0) {
      console.error("DAL Error: Invalid ID passed to getProjectById:", id);
      return null;
    }
  const sql = `
    SELECT p.*, ARRAY_AGG(pt.technology_id) as tech_ids
    FROM projects p
    LEFT JOIN project_technologies pt ON p.id = pt.project_id
    WHERE p.id = $1
    GROUP BY p.id
  `;
  const { rows } = await query(sql, [id]);
  return rows[0] || null;
};


// public method for caching 
export const getAllPublicProjects = async () => {
    'use cache'
    cacheTag('projects')
  const sql = `
        SELECT p.* ,ARRAY_AGG(t.name) as tech_stack FROM projects p 
        LEFT JOIN project_technologies pt ON p.id =pt.project_id
        LEFT JOIN Technologies t ON pt.technology_id = t.id
        GROUP BY p.id
        ORDER BY p.id DESC
        `;
  const { rows } = await query(sql);
  return rows;
};

// get project by id with its tech stack
export const getPublicProjectBySlug = async (slug: string) => {
    'use cache'
    cacheTag(`project-${slug}`)
  const sql = `
        SELECT p.* , ARRAY_AGG(t.name) AS tech_stack FROM projects p 
        LEFT JOIN project_technologies pt ON pt.project_id = p.id
        LEFT JOIN technologies t On t.id = pt.technology_id
        WHERE p.slug = $1
        GROUP BY p.id
    `;
  const { rows } = await query(sql, [slug]);
  return rows[0] || null;
};
