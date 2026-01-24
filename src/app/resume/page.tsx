// src/app/resume/page.tsx
import { query } from "@/lib/db";
import { iResume } from "@/types/database";
import ResumeClientView from "./ResumeClientView";

async function getAllLatestResumes() {
  // Fetches the 'is_latest' version for every category found in the DB
  const sql = `SELECT * FROM resumes WHERE is_latest = true`;
  const { rows } = await query(sql);
  return rows as iResume[];
}

export default async function ResumePage() {
  const latestResumes = await getAllLatestResumes();

  if (!latestResumes || latestResumes.length === 0) {
    return (
      <div className="text-white p-20 text-center">
        No active resumes found in vault.
      </div>
    );
  }

  return <ResumeClientView initialData={latestResumes} />;
}
