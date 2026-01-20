import { Terminal, Globe, Database, Cpu, Zap, Code2 } from "lucide-react";

export const academicMilestones = [
  {
    semester: "Semester 6 (Current)",
    focus: "Enterprise DevOps & Cloud Computing",
    details:
      "Advanced Cloud Architecture, Scaling Backend Systems, and Minor in DevOps Specialization.",
    status: "Active",
  },
  {
    semester: "Semester 5",
    focus: "Data Pipelines & Distributed Systems",
    details:
      "Mastered Postgres, Redis, CI/CD, and GitHub Actions for professional deployment workflows.",
    status: "Completed",
  },
  {
    semester: "Semester 4",
    focus: "Backend Engineering",
    details:
      "Deep dive into Node.js, Express, and GoLang for high-performance server-side logic.",
    status: "Completed",
  },
  {
    semester: "Semester 3",
    focus: "Core CS & Modern Web",
    details:
      "Advanced C++, Operating Systems, Linux/Shell Scripting, Networking, and React/MongoDB Stack.",
    status: "Completed",
  },
  {
    semester: "Semester 2",
    focus: "Database & Logic",
    details:
      "Mastered Relational Databases (DBMS) and Low-level Programming with C.",
    status: "Completed",
  },
  {
    semester: "Semester 1 (Aug 2023)",
    focus: "Programming Fundamentals",
    details:
      "Started B.Tech CSE at LPU. Mastered Python and Web Basics (HTML/CSS/JS).",
    status: "Completed",
  },
];

export const techStack = [
  "Full Stack Developer",
  "MERN Stack",
  "NextJS",
  "Postgres",
  "Redis",
  "Docker",
  "DevOps",
  "AWS",
  "Terraform",
  "Linux",
  "Scripting",
  "C/C++",
  "TS",
  "GoLang Developer (Backend & CLI)",
  "JS",
  "Bash Scripting",
];

export const blogPosts = [
  {
    title: "Deep Dive into Finite Automata & Computational Logic",
    excerpt:
      "Exploring the mathematical foundations of computer science and how language principles shape modern compiler design.",
    category: "Core CS",
    readTime: "8 min",
    date: "Aug 2025",
    verifiedBy: "Infosys Springboard", //
    isFeatured: true,
  },
  {
    title: "Scaling CarbonTrack: From Localhost to AWS ECS",
    excerpt:
      "A technical walkthrough of deploying a carbon-footprint calculator using AWS infrastructure and Redis caching.",
    category: "Architecture",
    readTime: "12 min",
    date: "Jan 2026",
    verifiedBy: "Industrial Training", //
  },
  {
    title: "The Prompt Engineering Fallacy in 2026",
    excerpt:
      "Why understanding LLM architecture is more important than memorizing prompts for GenAI application development.",
    category: "AI",
    readTime: "6 min",
    date: "Sep 2025",
    verifiedBy: "Infosys GenAI", //
  },
  {
    title: "Deep Dive into Finite Automata & Computational Logic",
    excerpt:
      "Exploring the mathematical foundations of computer science and how language principles shape modern compiler design.",
    category: "Core CS",
    readTime: "8 min",
    date: "Aug 2025",
    verifiedBy: "Infosys Springboard", //
    isFeatured: true,
  },
  {
    title: "Scaling CarbonTrack: From Localhost to AWS ECS",
    excerpt:
      "A technical walkthrough of deploying a carbon-footprint calculator using AWS infrastructure and Redis caching.",
    category: "Architecture",
    readTime: "12 min",
    date: "Jan 2026",
    verifiedBy: "Industrial Training", //
  },
  {
    title: "The Prompt Engineering Fallacy in 2026",
    excerpt:
      "Why understanding LLM architecture is more important than memorizing prompts for GenAI application development.",
    category: "AI",
    readTime: "6 min",
    date: "Sep 2025",
    verifiedBy: "Infosys GenAI", //
  },
  {
    title: "Deep Dive into Finite Automata & Computational Logic",
    excerpt:
      "Exploring the mathematical foundations of computer science and how language principles shape modern compiler design.",
    category: "Core CS",
    readTime: "8 min",
    date: "Aug 2025",
    verifiedBy: "Infosys Springboard", //
    isFeatured: true,
  },
  {
    title: "Scaling CarbonTrack: From Localhost to AWS ECS",
    excerpt:
      "A technical walkthrough of deploying a carbon-footprint calculator using AWS infrastructure and Redis caching.",
    category: "Architecture",
    readTime: "12 min",
    date: "Jan 2026",
    verifiedBy: "Industrial Training", //
  },
  {
    title: "The Prompt Engineering Fallacy in 2026",
    excerpt:
      "Why understanding LLM architecture is more important than memorizing prompts for GenAI application development.",
    category: "AI",
    readTime: "6 min",
    date: "Sep 2025",
    verifiedBy: "Infosys GenAI", //
  },
];

 interface ICertification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  skills: string[];
  category:
    | "Artificial Intelligence"
    | "CS Fundamentals"
    | "Networking"
    | "Industrial Training"
    | "Academic MOOCs";
  verificationUrl: string;
}

export const allCerts: ICertification[] = [
  {
    id: "INF-GEN-AI-2025",
    title: "Build Generative AI Apps and Solutions",
    issuer: "Infosys Springboard",
    date: "August 16, 2025",
    image: "/certs/infosys-ai.png",
    skills: ["Prompt Engineering", "No-Code AI", "LLM Integration"],
    category: "Artificial Intelligence",
    verificationUrl: "https://infyspringboard.onwingspan.com/verify/...",
  },
  {
    id: "INF-TH-AUTOMATA",
    title: "Computational Theory: Language Principle & Finite Automata",
    issuer: "Infosys Springboard",
    date: "August 11, 2025",
    image: "/certs/infosys-theory.jpg",
    skills: ["Automata Theory", "Computational Logic", "Formal Languages"],
    category: "CS Fundamentals",
    verificationUrl: "#",
  },
  {
    id: "NPTEL-CS-DSA",
    title: "Data Structures and Algorithms (NPTEL)",
    issuer: "NPTEL / IIT",
    date: "Dec 2024",
    image: "/certs/nptel-dsa.jpg",
    skills: ["Algorithm Design", "Complexity Analysis", "C++"],
    category: "Academic MOOCs",
    verificationUrl: "#",
  },
  {
    id: "TRN-MERN-882",
    title: "Advanced MERN Stack Development Training",
    issuer: "External Industry Training",
    date: "June 2024",
    image: "/certs/mern-training.jpg",
    skills: ["MongoDB", "Express", "React", "Node.js", "System Design"],
    category: "Industrial Training",
    verificationUrl: "#",
  },
  {
    id: "GOOGLE-NET-912",
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Google via Coursera",
    date: "September 2024",
    image: "/certs/google-net.jpg",
    skills: ["TCP/IP", "DNS", "Network Troubleshooting"],
    category: "Networking",
    verificationUrl: "https://www.coursera.org/verify/...",
  },
];
 interface IProject {
  id: string;
  title: string;
  tagline: string;
  category: "Systems" | "SaaS" | "Full-Stack";
  tech: string[]; // For registry cards
  stack: string[]; // For detailed bento grid
  desc: string; // Short version for cards
  overview: string; // Long version for slug page
  challenge: string;
  decision: string;
  learning: string;
  githubLink: string;
  liveDemoLink: string;
  screenshots: string[];
  icon: React.ReactNode;
  color: string;
}

export const projects: IProject[] = [
  {
    id: "note-taker-cli",
    title: "Note Taker CLI",
    tagline: "High-performance terminal workspace for Fedora Linux.",
    category: "Systems",
    tech: ["GoLang", "Bubble Tea", "Podman"],
    stack: ["Go", "LipGloss", "Cobra", "SQLite", "Docker"],
    desc: "A specialized terminal tool built for developers. Features real-time markdown rendering and concurrent file sync.",
    overview:
      "I developed this CLI tool to provide a frictionless note-taking experience directly from the terminal. It uses Go's concurrency model to handle file indexing and local database sync without blocking the user interface.",
    challenge:
      "The biggest hurdle was building a smooth TUI (Terminal User Interface) that remained responsive while processing large directories of Markdown files.",
    decision:
      "I chose SQLite for local storage over plain JSON files because it guaranteed data integrity and provided much faster search queries as the notes grew.",
    learning:
      "Mastered the 'Model-View-Update' architecture in Go and learned how to optimize terminal rendering cycles for low-latency output.",
    githubLink: "https://github.com/thissidemayur/note-cli",
    liveDemoLink: "#",
    screenshots: ["/certs/postman.jpg", "/certs/genai.png"],
    icon: <Terminal className="text-emerald-500" />,
    color: "emerald",
  },
  {
    id: "content-banao",
    title: "ContentBanao",
    tagline: "Automated SEO indexing and content management platform.",
    category: "SaaS",
    tech: ["Next.js 15", "Postgres", "Redis"],
    stack: ["Next.js", "TypeScript", "Prisma", "Redis", "Resend", "AWS"],
    desc: "A full-scale SaaS platform that helps creators manage content with automated SEO indexing and magic-link security.",
    overview:
      "ContentBanao is a cloud-native platform designed to simplify the SEO workflow. It automates the submission of URLs to search engines and provides a clean dashboard for tracking growth.",
    challenge:
      "Handling secure user authentication without traditional passwords while ensuring that magic links didn't expire too quickly for the user.",
    decision:
      "I implemented Redis for session management because of its sub-millisecond latency, which was necessary for the real-time SEO status updates.",
    learning:
      "Gained deep experience in Next.js Server Actions and how to secure API routes using middleware patterns in a multi-tenant environment.",
    githubLink: "https://github.com/thissidemayur/content-banao",
    liveDemoLink: "https://contentbanao.com",
    screenshots: ["/certs/genai.png", "/certs/postman.jpg"],
    icon: <Globe className="text-blue-500" />,
    color: "blue",
  },
  {
    id: "carbon-calculator",
    title: "EcoTrack",
    tagline: "Visualizing household carbon footprints through data.",
    category: "Full-Stack",
    tech: ["MERN", "Docker", "Recharts"],
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind", "Docker"],
    desc: "Analytical engine for tracking household emissions with data persistence and interactive visual analytics.",
    overview:
      "EcoTrack allows users to log daily activities and see their environmental impact in real-time. It provides actionable suggestions based on the user's highest emission sources.",
    challenge:
      "Calculating accurate CO2 equivalents from diverse data points (electricity, travel, waste) while maintaining a performant MongoDB aggregation pipeline.",
    decision:
      "I containerized the entire application using Docker to ensure consistent behavior between my Fedora dev environment and the production server.",
    learning:
      "Improved my data visualization skills using Recharts and learned how to build complex multi-step forms that feel fast and light for the user.",
    githubLink: "https://github.com/thissidemayur/ecotrack",
    liveDemoLink: "https://ecotrack.me",
    screenshots: ["/certs/postman.jpg", "/certs/genai.png"],
    icon: <Database className="text-purple-500" />,
    color: "purple",
  },
];

export const MOCK_PROJECTS = [
  {
    id: 1,
    title: "E-Commerce OS",
    summary: "A high-performance distributed system for retail management.",
    tech_stack: ["Next.js", "PostgreSQL", "Redis", "Docker"],
    slug: "ecommerce-os",
    image_url: "/projects/ecommerce.jpg",
    is_featured: true,
  },
  {
    id: 2,
    title: "Real-time Analytics",
    summary: "Event-driven dashboard processing 10k events per second.",
    tech_stack: ["Go", "Apache Kafka", "ClickHouse", "React"],
    slug: "realtime-analytics",
    image_url: "/projects/analytics.jpg",
    is_featured: true,
  },
];

export const MOCK_BLOGS = [
  {
    id: 1,
    title: "Deep Dive into Database Indexing",
    summary: "How B-Trees work and why your queries are slow without them.",
    published_at: "2024-03-15",
    slug: "database-indexing",
    category: "TECHNICAL",
  },
  {
    id: 2,
    title: "The Clean Code Paradox",
    summary: "Balancing maintainability with delivery speed in startups.",
    published_at: "2024-03-10",
    slug: "clean-code-paradox",
    category: "NON_TECHNICAL",
  },
];