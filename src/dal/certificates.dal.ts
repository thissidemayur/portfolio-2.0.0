import { query } from "@/lib/db";
import { iCertificate } from "@/types/database";


export async function getAllCertificates(): Promise<iCertificate[]> {
  try {
    const certs = await query(
      "SELECT * FROM certificates ORDER BY issue_date DESC",
    );
    return certs.rows;
  } catch (error) {
    console.error("Error fetching all certificates:", error);
    return [];
  }
}


export async function getFeaturedCertificates(): Promise<iCertificate[]> {
  try {
    const certs = await query(
      "SELECT * FROM certificates WHERE show_on_home = true OR is_industry_standard = true ORDER BY issue_date DESC LIMIT 4",
    );
    return certs.rows;
  } catch (error) {
    console.error("Error fetching featured certificates:", error);
    return [];
  }
}



export async function createCertificate(data: Omit<iCertificate, 'id'>) {
  try {
    const sql = `
      INSERT INTO certificates (
        title, issuer, issue_date, expiry_date, image_url, 
        verify_link, slug, credential_url, is_industry_standard, show_on_home
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;
    const values = [
      data.title,
      data.issuer,
      data.issue_date,
      data.expiry_date,
      data.image_url,
      data.verify_link,
      data.slug,
      data.credential_url,
      data.is_industry_standard,
      data.show_on_home // The extra field for Home visibility
    ];

    const result = await query(sql, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating certificate:", error);
    throw error
  }
}


export async function deleteCertificate(id: number) {
  try {
    const sql = "DELETE FROM certificates WHERE id = $1 RETURNING id;";
    const result = await query(sql, [id]);
    
    if (result.rowCount === 0) {
      throw new Error("Certificate not found");
    }
    
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting certificate:", error);
    throw error
  }
}


export async function updateCertificate(id: number, data: Partial<Omit<iCertificate, 'id'>>) {
  try {
    const fieldsToUpdate = {
      ...data,
    };

    const keys = Object.keys(fieldsToUpdate);
    if (keys.length === 0) return null;

    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");
    const sql = `UPDATE certificates SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
    
    const result = await query(sql, [...Object.values(fieldsToUpdate), id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating certificate:", error);
    throw error
  }
}


export async function getCertificateById(id: number): Promise<iCertificate | null> {
  try {
    const sql = "SELECT * FROM certificates WHERE id = $1";
    const { rows } = await query(sql, [id]);
    return rows[0] || null;
  } catch (error) {
    console.error("error while fetching certificate by its id")
    console.error(error)
    return null;
  }
}

