export type iBlog = {
  id: number;
  title: string;
  slug: string;
  content: string;
  published_at: Date;
  category: BlogType;
  summary: string;
  image_url: string;
  is_featured: boolean;
  updated_at?: Date;
};
export type BlogType = "TECHNICAL" | "NON_TECHNICAL";

export type IMsg = {
  name: string;
  email: string;
  subject: string;
  message: string;
  id: number;
  is_read: boolean;
  received_at: Date;
};

export type iProject = {
  id: number;
  title: string;
  content: string;
  summary: string;
  image_url: string;
  live_url?: string;
  repo_url: string;
  slug: string;
  is_featured: boolean;
  problem_statement: string;
  solution_approach: string;
  key_learnings: string[];
  challenges_faced: string[];
  created_at: Date;
  updated_at: Date;
  tech_stack: string[];
};

export type iResume = {
  id: number;
  version_name: string;
  focus_area: ResumeType;
  file_url: string;
  is_latest: boolean;
  created_at: string;
};
export type ResumeType = "fullstack" | "backend" | "devops";

export type iTech = {
  id: number;
  name: string;
  category: TechCategory;
  icon_slug: string;
  is_main_stack: boolean;
};
export type TechCategory =
  | "languages & runtimes"
  | "frontend"
  | "backend"
  | "database & ORMs"
  | "devops"
  | "tools"
  | "other";

export interface iCertificate {
  id: number;
  title: string;
  issuer: string;
  issue_date: Date | string; 
  expiry_date?: Date | string | null; 
  image_url: string; 
  verify_link?: string | null; // Link to Credly/Coursera verification
  slug: string; 
  credential_url?: string | null; // Direct link to the PDF/Badge
  is_industry_standard: boolean; 
  show_on_home: boolean; 
}