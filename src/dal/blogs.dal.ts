import { query } from "@/lib/db";
import { iBlog } from "@/types/database";
import { cacheTag } from "next/cache";

// get all blogs
export const getAllBlog = async ({
  limit,
  offset,
}: {
  limit?: number;
  offset: number;
}) => {
  const sql = `
        SELECT * FROM blogs ORDER BY published_at DESC LIMIT $1 OFFSET $2
    `;
  const values = [limit || 100, offset];
  const { rows } = await query(sql, values);
  return rows;
};

// GET blog by slug
export const getBlogBySlug = async (slug: string) => {
  const sql = `
        SELECT * FROM blogs WHERE slug = $1
    `;
  const { rows } = await query(sql, [slug]);
  return rows[0] || null;
};

// add a new blog
export const addNewBlog = async (
  blog: Omit<iBlog, "id" | "published_at" | "created_at">,
) => {
  const sql = `
        INSERT INTO blogs (title, content, summary, image_url, slug, category, is_featured)
        values ($1,$2,$3,$4,$5,$6,$7)
        RETURNING id
    `;
  const values = [
    blog.title,
    blog.content,
    blog.summary,
    blog.image_url,
    blog.slug,
    blog.category,
    blog.is_featured,
  ];
  const { rows } = await query(sql, values);
  return rows[0];
};

// delete a blog
export const deleteBlog = async (id: number) => {
  const sql = `
        DELETE FROM blogs WHERE id=$1 RETURNING id, slug
    `;
  const { rows } = await query(sql, [id]);
  return rows[0];
};

// update a blog
export const updateBlog = async (
  id: number,
  blog: Partial<Omit<iBlog, "id" | "published_at" | "updated_at">>,
) => {
  const keys = Object.keys(blog);
  if (keys.length === 0) return null;

  // 1. Map keys to placeholders ($1, $2...)
  // 2. Add 'updated_at = CURRENT_TIMESTAMP' automatically
  const setClause = [
    ...keys.map((key, indx) => `${key} = $${indx + 1}`),
    `updated_at = CURRENT_TIMESTAMP`,
  ].join(", ");

  // The ID placeholder will be the next number after our dynamic keys
  const idPlaceholder = keys.length + 1;

  const sql = `
        UPDATE blogs 
        SET ${setClause} 
        WHERE id = $${idPlaceholder}
        RETURNING *
    `;

  const values = [...Object.values(blog), id];

  try {
    const { rows } = await query(sql, values);
    return rows[0];
  } catch (error) {
    console.error("DAL_EXECUTION_ERROR: updateBlog failed", error);
    throw error;
  }
};

export const getBlogById = async (id: number) => {
  const sql = `
        SELECT * FROM blogs WHERE id = $1
    `;
  const { rows } = await query(sql, [id]);
  return rows[0] || null;
};

// non-admin method for caching use for public method
// get all blogs
export const getAllPublicBlog = async ({
  limit,
  offset,
}: {
  limit?: number;
  offset: number;
}) => {
  "use cache";
  cacheTag("blogs");
  const sql = `
        SELECT * FROM blogs ORDER BY published_at DESC LIMIT $1 OFFSET $2
    `;
  const values = [limit || 100, offset];
  const { rows } = await query(sql, values);
  return rows;
};

export const getBlogStats = async () => {
  "use cache";
  cacheTag("blogs-count");

  try {
    const sql = `
      SELECT 
        COUNT(*)::int as total,
        COUNT(*) FILTER (WHERE is_featured = true)::int as featured
      FROM blogs
    `;
    const { rows } = await query(sql);

    return {
      total: rows[0].total || 0,
      featured: rows[0].featured || 0,
    };
  } catch (error) {
    console.error("Error fetching blog stats:", error);
    return { total: 0, featured: 0 };
  }
};

