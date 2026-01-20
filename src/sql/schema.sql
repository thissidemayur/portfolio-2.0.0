-- enums 
DO $$ BEGIN
    CREATE TYPE tech_category AS ENUM (
    'languages & runtimes',
    'frontend',
    'backend',
    'database & ORMs',
    'devops',
    'tools',
    'other'
    );

    CREATE TYPE blog_type AS ENUM('personal', 'technical');

    CREATE TYPE resume_focous AS ENUM('fullstack', 'backend', 'devops');

EXCEPTION
    WHEN duplicate_object THEN NULL;

END $$;


-- tables
CREATE TABLE IF NOT EXISTS technologies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category tech_category NOT NULL,
    icon_slug VARCHAR(255) NOT NULL,
    is_main_stack BOOLEAN  DEFAULT false
);

CREATE TABLE IF NOT EXISTS projects(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL ,
    content TEXT NOT NULL,
    summary TEXT NOT NULL UNIQUE,
    image_url TEXT NOT NULL,
    live_url TEXT UNIQUE,
    repo_url TEXT NOT NULL UNIQUE,
    slug VARCHAR(255) UNIQUE NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    problem_statement TEXT NOT NULL,
    solution_approach TEXT NOT NULL,
    key_learnings TEXT[] NOT NULL,
    challenges_faced TEXT[] NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS project_technologies (
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    technology_id INTEGER REFERENCES technologies(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, technology_id)
);

CREATE TABLE IF NOT EXISTS certificates(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    image_url TEXT NOT NULL,
    verify_link TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    credential_url TEXT UNIQUE,
    is_industry_standard BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS blogs(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    summary TEXT NOT NULL UNIQUE,
    image_url TEXT NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category blog_type NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS resumes(
    id SERIAL PRIMARY KEY,
    version_name VARCHAR(100) UNIQUE NOT NULL,
    focus_area resume_focous NOT NULL,
    file_url TEXT NOT NULL,
    is_latest BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS contact_messages(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);