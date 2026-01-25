import { iResume } from "@/types/database";
import ResumeClientView from "./ResumeClientView";
import { getLatestResumesForAllCategories } from "@/dal/resumes.dal";



export default async function ResumePage() {
  const latestResumes: iResume[] = await getLatestResumesForAllCategories();

  if (!latestResumes || latestResumes.length === 0) {
    return (
      <div className="text-white p-20 text-center">
        No active resumes found in vault.
      </div>
    );
  }

  return <ResumeClientView initialData={latestResumes} />;
}
