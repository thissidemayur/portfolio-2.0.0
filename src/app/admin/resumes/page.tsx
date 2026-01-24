// src/app/admin/resumes/page.tsx
import { getResumeHistory } from "@/dal/resumes.dal";
import ResumeDashboard from "./resumeDashboard";

export default async function ResumeAdminPage() {
  // 1. Fetch data directly from the DB using your DAL
  const history = await getResumeHistory();

  return (
    // 2. Pass the fetched rows to your Client Component
    <ResumeDashboard history={history} />
  );
}
