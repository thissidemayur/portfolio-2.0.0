# 🚀 Portfolio 1.0.0 | Dynamic Content Vault & CMS

A high-performance, **SEO-engineered** portfolio and management system built with **Next.js 15**, **PostgreSQL**, and **Edge Authentication**. This platform is designed as a "Living Portfolio"—allowing for real-time updates to resumes, blogs, projects, and certifications through a custom administrative suite without ever touching the source code.

---

## 🛠 Tech Stack

* **Framework:** `Next.js 15` (App Router, Server Actions)
* **Database:** `PostgreSQL` (Pure SQL, high-performance queries, No ORM)
* **Security:** `jose` (Lightweight JWT-based Edge Authentication)
* **Editor:** `Tiptap` (Headless Rich Text Editor for professional blogging)
* **Validation:** `Zod` (Strict schema enforcement for data integrity)
* **Email:** `Resend` + `React-Email` (Transactional email automation)
* **Visualization:** `react-github-calendar` (Activity tracking)
* **Styling:** `Tailwind CSS` (Custom A4-Print layouts for university-compliant resumes)

---

## ✨ Key Features

### 1. Caching & Rendering Strategy
* **Hybrid Rendering:** Optimized use of **Server-Side Rendering (SSR)** for dynamic content and **Static Site Generation (SSG)** for high-speed delivery of static pages.
* **On-Demand Revalidation:** Utilizes `revalidatePath` and `revalidateTag` to purge cache instantly when data (like a new blog or resume version) is updated in the CMS.
* **Persistent Caching:** Implements Next.js **Data Cache** to minimize database hits, ensuring lightning-fast load times while keeping data fresh.



### 2. Dynamic Content Management (CMS)
* **Zero-Code Updates:** Manage certificates, tech-stack items, and experience through a secure dashboard.
* **Advanced Editor:** Integrated **Tiptap** editor for rich-text blogs and project case studies.
* **Resume Vault:** Instantly toggle between **Fullstack, Backend, and DevOps** resume versions tailored for specific roles or university placement (LPU) requirements.

### 3. Performance & SEO Optimization
* **Core Web Vitals:** Architected for high Google Lighthouse scores with a focus on LCP (Largest Contentful Paint) and CLS (Cumulative Layout Shift).
* **Metadata API:** Dynamic SEO headers and OpenGraph images for every entity.
* **Semantic Web:** Implements **JSON-LD (Linked Data)** to connect professional identity across the web.



### 4. Edge Security & Reliability
* **Stateless Auth:** Ultra-fast authentication using `jose` at the edge—eliminating heavy session databases.
* **Transactional Pipeline:** Contact form submissions trigger automated email workflows via `Resend`.
* **SQL Precision:** Raw PostgreSQL queries to ensure maximum control over data relationships and performance.

### 5. System Architecture & Performance
* **Intelligent Code Splitting:** Implements a **Dynamic Bridge Pattern** for client-side components to eliminate hydration mismatches and reduce the initial JavaScript payload by **~40%**.
* **Lazy-Loaded Infrastructure:** Heavy interactive elements (like the Project Discovery Sync) are **dynamically imported** on interaction. This optimizes the critical rendering path and prioritizes **First Contentful Paint (FCP)**.
Long-Task Elimination: Minimized Total Blocking Time (TBT) by auditing the Main Thread via Chrome DevTools, identifying and breaking up heavy "Evaluate Script" tasks into manageable sub-tasks.

---

## 📂 Database Architecture

Leveraging the power of relational data with `JSONB` for flexible, nested resume components.

```sql
-- Core Content Structure
CREATE TABLE resumes (
    id SERIAL PRIMARY KEY,
    version_name VARCHAR(255) UNIQUE NOT NULL,
    category resume_category DEFAULT 'GENERAL',
    summary TEXT[],      -- Professional summaries as arrays
    skills TEXT[],       -- Skill categorization
    experiece JSONB,     -- Deeply nested work history (JSONB for flexibility)
    projects JSONB,      -- Multi-field project data
    education JSONB,     -- Academic records
    is_latest BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

```
---

##  🚀 Environment Setup
To run this project locally, create a **.env.local** file with the following variables:
```.env
# Database Configuration
DATABASE_URL="your_postgresql_url"

# Edge Security
ADMIN_PASSWORD="your_secure_password"
JWT_SECRET="your_32_character_secret_key" # Min 32 chars recommended

# Communication
RESEND_API_KEY="your_resend_api_key"
```
---


## Installation
### 1. Clone the Repository:
```
git clone [https://github.com/thissidemayur/portfolio1.0.0.git](https://github.com/thissidemayur/portfolio-2.0.0.git)
```

### 2. Install Dependecies
```
npm install
```

### 3. Run Development Server:
```
npm run dev
```

## 👨‍💻 Author
### **Mayur Pal**
- **Github**: @thissidemayur
- **Education**: Lovely Professional University (B.Tech CSE)


-- applied double DAL pattern: keeping admin route as the source of truth with raw queries and the public routes fast with use casche