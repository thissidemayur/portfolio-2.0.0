
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
  updated_at?: Date;
  tech_stack: string[];
};


export type iSkillGroup = {
  category: string;
  items: string[];
};
export type iResume = {
  id: number;
  version_name: string;
  category: ResumeType;
  is_latest: boolean;

  summary: string[];
  skills: iSkillGroup[];

  experience: {
    company: string;
    role: string;
    duration: string;
    location?: string;
    points: string[];
  }[];

  projects: {
    title: string;
    tech: string;
    duration?: string;
    details: string[];
    link?: string;
  }[];

  education: {
    institution: string;
    degree: string;
    score: string;
    location?: string;
    duration: string;
  }[];

  achievements: string[];

  created_at: Date;
  updated_at: Date;
};

export type ResumeType = 'GENERAL'| 'FULLSTACK'| 'DEVOPS'| 'BACKEND';

export type iTech = {
  id: number;
  name: string;
  category: TechCategory;
  is_main_stack: boolean;
};
export type TechCategory =
  | "PROGRAMMING_LANGUAGES"
  | "FRONTEND"
  | "BACKEND"
  | "DB_ORM"
  | "INFRASTRUCTURE(aws)"
  | "DEVOPS"
  | "TOOLS";

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