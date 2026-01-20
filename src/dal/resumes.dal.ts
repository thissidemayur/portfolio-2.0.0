import { query } from "@/lib/db";
import { iResume, ResumeType } from "@/types/database";


// get resume history
export const getResumeHistory = async()=>{
    const sql = `
        SELECT * FROM resumes ORDER BY created_at DESC, is_latest DESC
    `;
    const {rows} = await query(sql);
    return rows;
};

// get latest resume by focus area
export const getLatestResumeByFocusArea = async(focus_area:ResumeType)=>{
    const sql = `
        SELECT * FROM resumes WHERE focus_area=$1 AND is_latest = true
    `;
    const {rows} = await query(sql,[focus_area]);
    return rows[0] || null;
}

// upload a new resume
export const uploadNewResume = async(resume:Omit<iResume,'id' | 'created_at'>)=>{
    // begin transaction
    await query('BEGIN');
    try {
      // set previous latest to false
      const updateSql = `
        UPDATE resumes SET is_latest = false WHERE focus_area = $1 AND is_latest = true
    `;
      await query(updateSql, [resume.focus_area]);

      // insert new resume
      const sql = `
        INSERT INTO resumes (version_name, focus_area, file_url, is_latest)
        VALUES ($1,$2,$3,$4)
        RETURNING *
    `;

      const values = [
        resume.version_name,
        resume.focus_area,
        resume.file_url,
        resume.is_latest,
      ];
      const { rows } = await query(sql, values);

    //   commit transaction
    await query('COMMIT')
      return rows[0];
    } catch (error) {
        await query('ROLLBACK');
        console.error('Error uploading new resume:');
        console.error(error);
        throw error
    }

}

// delete a resume by id
export const deleteResumeById = async(id:number)=>{
    const sql = `
        DELETE FROM resumes WHERE id=$1 RETURNING id
    `;
    const {rows} = await query(sql,[id]);
    return rows[0];
}

// marks a resume as latest
export const markResumeAsLatest = async(id:number,focus_area:ResumeType)=>{
    // set previous latest to false
    const updateSql= `
        UPDATE resumes SET is_latest = false WHERE focus_area = $1 AND is_latest = true

    `;
    await query(updateSql,[focus_area])


    // set a new latest resume
    const sql = `
        UPDATE resumes SET is_latest = true WHERE id=$1
    `;
    const {rows} = await query(sql,[id]);
    return rows[0];

}

// get resume by id
export const getResumeById = async(id:number)=>{
    const sql = `
        SELECT * FROM resumes WHERE id=$1
    `;
    const {rows} = await query(sql,[id]);
    return rows[0] || null;
}

// update resume details
export const updateResumeDetails = async(id:number,details:Partial<Omit<iResume,'id' | 'created_at'>>)=>{
  
    // 
    const key = Object.keys(details);
    if (key.length ===0) return null;

    // build dynamic set clause
    const setClause = key.map((k,i) => `${k} = $${i + 1}`).join(', ');

    const sql = `
        UPDATE resumes SET ${setClause} WHERE id = $${key.length + 1} RETURNING *
    `;
    const values = [...Object.values(details), id];
    const {rows} = await query(sql,values);
    return rows[0] || null;
}
