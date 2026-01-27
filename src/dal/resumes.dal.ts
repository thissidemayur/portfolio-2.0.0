"use server"
import { query } from "@/lib/db";
import { iResume, ResumeType } from "@/types/database";
import { cacheTag } from "next/cache";

// 1. Get Resume History (Listing versions in Admin)
export const getResumeHistory = async () => {
  const sql = `SELECT * FROM resumes ORDER BY created_at DESC`;
  const { rows } = await query(sql);
  return rows;
};

// 2. Get Latest by Focus (For the Public Website)
export const getLatestResumeByCategory = async (category: ResumeType) => {
  const sql = `
    SELECT * FROM resumes 
    WHERE category = $1 AND is_latest = true 
    LIMIT 1
  `;
  const { rows } = await query(sql, [category]);
  return rows[0] || null;
};

// 3. Save/Create New Resume Version
export const createResumeVersion = async (
  resume: Omit<iResume, "id" | "created_at">,
) => {
  await query("BEGIN");
  try {
    // If this new version is marked as latest, unset the old one for THIS focus area
    if (resume.is_latest) {
      await query(
        `UPDATE resumes SET is_latest = false WHERE category = $1 AND is_latest = true`,
        [resume.category],
      );
    }

    const sql = `
      INSERT INTO resumes (
        version_name, category, is_latest, 
        summary, skills, experience, projects, education, achievements
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const values = [
      resume.version_name,
      resume.category,
      resume.is_latest,
      resume.summary,
      JSON.stringify(resume.skills), // JSONB - Must be stringified
      JSON.stringify(resume.experience), // JSONB - Must be stringified
      JSON.stringify(resume.projects), // JSONB - Must be stringified
      JSON.stringify(resume.achievements), // JSONB - Must be stringified
      JSON.stringify(resume.education),
    ];

    const { rows } = await query(sql, values);
    await query("COMMIT");
    return rows[0];
  } catch (error) {
    await query("ROLLBACK");
    throw error;
  }
};

// 4. Mark specific ID as Latest
export const markResumeAsLatest = async (
  id: number,
  category: ResumeType,
) => {
  await query("BEGIN");
  try {
    // Unset current latest for this specific category only
    await query(
      `UPDATE resumes SET is_latest = false WHERE category = $1 AND is_latest = true`,
      [category],
    );
    // Set new latest
    const { rows } = await query(
      `UPDATE resumes SET is_latest = true WHERE id = $1 RETURNING *`,
      [id],
    );
    await query("COMMIT");
    return rows[0];
  } catch (error) {
    await query("ROLLBACK");
    throw error;
  }
};

// 5. Update Existing Details (Dynamic SQL)
export const updateResumeDetails = async (
  id: number,
  details: Partial<iResume>,
) => {
  const keys = Object.keys(details);
  if (keys.length === 0) return null;

  const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");
  const sql = `UPDATE resumes SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
  const values = [...Object.values(details), id];

  const { rows } = await query(sql, values);
  return rows[0];
};


// 6. Upload New Resume (Alias for createResumeVersion to match your Actions)
export const uploadNewResume = async (
  resume: Omit<iResume, "id" | "created_at">
) => {
  return await createResumeVersion(resume);
};

// 7. Delete Resume By ID
export const deleteResumeById = async (id: number) => {
  const sql = `DELETE FROM resumes WHERE id = $1 RETURNING *`;
  const { rows } = await query(sql, [id]);
  
  if (rows.length === 0) {
    throw new Error("Resume not found or already deleted.");
  }
  
  return rows[0];
};


// 2 dal caching strategy
export const getPublicResumeHistory = async () => {
  'use cache'
  cacheTag('resumes')
  const sql = `SELECT * FROM resumes ORDER BY created_at DESC`;
  const { rows } = await query(sql);
  return rows;
};

export const getPublicLatestResumeByCategory = async (category: ResumeType) => {
  'use cache'
  cacheTag(`resume-${category}`)
  const sql = `
    SELECT * FROM resumes 
    WHERE category = $1 AND is_latest = true 
    LIMIT 1
  `;
  const { rows } = await query(sql, [category]);
  return rows[0] || null;
};

// We create a specific DAL caller that gets the latest for ALL categories
export async function getLatestResumesForAllCategories(): Promise<iResume[]> {
  'use cache';
  cacheTag('resumes');
  
  // This query gets the latest entry for EACH category in one go
  const sql = `
    SELECT * FROM resumes 
    WHERE is_latest = true
    ORDER BY category ASC
  `;
  const { rows } = await query(sql);
  return rows;
}