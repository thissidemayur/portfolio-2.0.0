INSERT INTO technologies (name, category, is_main_stack) VALUES
-- Programming Languages
('C', 'PROGRAMMING_LANGUAGES', false),
('C++', 'PROGRAMMING_LANGUAGES', false),
('JavaScript', 'PROGRAMMING_LANGUAGES', true),
('TypeScript', 'PROGRAMMING_LANGUAGES', true),
('Golang', 'PROGRAMMING_LANGUAGES', true),
('Bash Scripting', 'PROGRAMMING_LANGUAGES', true),

-- Frontend
('React', 'FRONTEND', true),
('Next.js', 'FRONTEND', true),
('Tailwind', 'FRONTEND', true),
('Shadcn', 'FRONTEND', true),
('Zustand', 'FRONTEND', true),
('RTK', 'FRONTEND', false),
('React Hook Form', 'FRONTEND', false),

-- Backend
('Express', 'BACKEND', true),
('Golang HTTP Server', 'BACKEND', true),
('Next-Auth', 'BACKEND', true),
('Cloudinary', 'BACKEND', false),
('Imginary', 'BACKEND', false),
('REST API', 'BACKEND', true),
('Reverse Proxy', 'BACKEND', false),
('Nginx', 'BACKEND', true),

-- Database & ORM
('PostgreSQL', 'DB_ORM', true),
('MongoDB', 'DB_ORM', false),
('Prisma', 'DB_ORM', true),
('Mongoose', 'DB_ORM', false),
('Redis', 'DB_ORM', true),

-- Infrastructure (AWS)
('EC2', 'INFRASTRUCTURE(aws)', true),
('ECS', 'INFRASTRUCTURE(aws)', true),
('IAM', 'INFRASTRUCTURE(aws)', true),
('S3', 'INFRASTRUCTURE(aws)', true),
('Route 53', 'INFRASTRUCTURE(aws)', false),
('VPC', 'INFRASTRUCTURE(aws)', true),
('Terraform', 'INFRASTRUCTURE(aws)', true),

-- DevOps
('CI/CD', 'DEVOPS', true),
('GitHub Actions', 'DEVOPS', true),
('Docker', 'DEVOPS', true),
('Git', 'DEVOPS', true),
('GitHub', 'DEVOPS', true),

-- Tools
('Linux', 'TOOLS', true),
('Vim', 'TOOLS', true),
('Postman', 'TOOLS', false)

ON CONFLICT (name) DO UPDATE SET 
    category = EXCLUDED.category,
    is_main_stack = EXCLUDED.is_main_stack;



DO $$ 
DECLARE 
    proj_id INT;
BEGIN
    INSERT INTO projects (
        title, 
        content, 
        summary, 
        image_url, 
        repo_url, 
        live_url,
        slug, 
        is_featured, 
        problem_statement, 
        solution_approach, 
        key_learnings, 
        challenges_faced
    ) VALUES (
        'Mayur_OS Portfolio v2.0.0',
        '<h1>🚀 Engineering a High-Performance Portfolio System</h1>
        <h2>The Challenge: Overcoming "Heavy" Client-Side Portfolios</h2>
        <p>Traditional React-based portfolios often suffer from bloated JavaScript bundles, leading to high <strong>Total Blocking Time (TBT)</strong> and poor <strong>Largest Contentful Paint (LCP)</strong>. For a Systems Engineer, a slow site is a bad resume. This project was built to prove that a feature-rich CMS can still achieve sub-second performance.</p>
        
        <h2>🛠 Architectural Strategy</h2>
        <h3>1. Performance Profiling & Main-Thread Optimization</h3>
        <p>Using the <strong>Chrome DevTools Performance Tab</strong>, I identified that "Evaluate Script" tasks were the primary cause of high TBT.</p>
        <ul>
            <li><strong>The Solution:</strong> Implemented <strong>Dynamic Routing</strong> and selective <strong>Component Hydration</strong>.</li>
            <li><strong>Result:</strong> Reduced the initial JavaScript payload by <strong>40%</strong>, moving heavy interactive elements off the critical rendering path.</li>
        </ul>

        <h3>2. Edge-Computing & Security with <code>jose</code></h3>
        <p>To avoid the latency of traditional session databases, I implemented <strong>Edge Authentication</strong>.</p>
        <ul>
            <li><strong>Stateless Auth:</strong> Utilizing <code>jose</code> for JWT verification directly within <strong>Next.js Middleware</strong>.</li>
            <li><strong>Secure Protocols:</strong> Admin access is governed by HTTP-only secure cookies, verified at the network edge to ensure unauthorized requests never even reach the server infrastructure.</li>
        </ul>

        <h3>3. SEO & Semantic Discovery</h3>
        <p>Visibility is as important as performance. This system automates the technical SEO pipeline:</p>
        <ul>
            <li><strong>Semantic HTML:</strong> Pure Server Components ensure that search engine crawlers receive fully rendered HTML instantly.</li>
            <li><strong>JSON-LD Integration:</strong> Automatically injects Schema.org structured data, allowing search engines to index the site as a professional entity.</li>
            <li><strong>Metadata API:</strong> Dynamic OpenGraph and Twitter cards are generated server-side for every project slug.</li>
        </ul>

        <h2>📈 Impact Metrics</h2>
        <ul>
            <li><strong>Performance:</strong> 98/100 (Mobile) | 100/100 (Desktop) via Lighthouse.</li>
            <li><strong>TBT:</strong> Reduced from 450ms to < 50ms.</li>
            <li><strong>FCP:</strong> Sub-300ms on global 4G connections.</li>
        </ul>',
        'An SEO-engineered, Edge-authenticated portfolio system optimized for Core Web Vitals and sub-second performance.',
        'https://mayur-portfolio-123.s3.ap-south-1.amazonaws.com/projects/Screenshot+From+2026-01-27+11-22-54.png',
        'https://github.com/thissidemayur/portfolio-2.0.0',
        'thissidemayur.me',
        'portfolio-engineering-v2',
        true,
        'High TBT and LCP in traditional React portfolios lead to poor UX and low SEO ranking.',
        'Used Next.js 15 dynamic routing and Edge Auth (jose) with Chrome DevTools performance auditing to eliminate main-thread blocking.',
        ARRAY['Performance Profiling with DevTools', 'Edge Middleware Auth', 'JSON-LD & Semantic SEO'],
        ARRAY['Reducing Evaluate Script overhead', 'Optimizing FCP via selective hydration']
    ) RETURNING id INTO proj_id;

    INSERT INTO project_technologies (project_id, technology_id)
    SELECT proj_id, id FROM technologies 
    WHERE name IN ('Next.js', 'PostgreSQL', 'Docker', 'GitHub Actions', 'TypeScript');
END $$;



INSERT INTO resumes (
    version_name, 
    category, 
    is_latest, 
    summary, 
    skills, 
    experience, 
    projects, 
    achievements, 
    education
) VALUES (
    'Mayur_Pal_DevOps_Fullstack_v1.0.4',
    'FULLSTACK',
    true,
    -- Summary: TEXT[]
    ARRAY[
        'Full-Stack & DevOps Engineer specializing in high-performance web systems and edge-native architecture.',
        'Architect of Portfolio 1.0.0, a system engineered for sub-300ms FCP and optimized Core Web Vitals via manual Main-Thread auditing.'
    ],
    -- Skills: JSONB (iSkillGroup[])
    '[
        {"category": "Programming Languages", "items": ["Go", "TypeScript", "JavaScript", "C++", "Bash"]},
        {"category": "Frontend", "items": ["Next.js 15", "React", "Tailwind CSS", "Zustand", "Shadcn/UI"]},
        {"category": "Backend & DB", "items": ["Golang HTTP", "Node.js", "PostgreSQL", "Redis", "Prisma"]},
        {"category": "Infrastructure & DevOps", "items": ["AWS (ECS, S3, EC2)", "Docker", "Terraform", "GitHub Actions", "Nginx"]}
    ]'::JSONB,
    -- Experience: JSONB
    '[
        {
            "company": "Personal Engineering Lab",
            "role": "Systems Architect & Developer",
            "duration": "2024 - Present",
            "location": "Remote",
            "points": [
                "Built a custom headless CMS using Next.js Server Actions and Raw SQL to eliminate ORM overhead.",
                "Implemented Edge-native authentication using jose, reducing auth latency by executing logic at the network edge.",
                "Optimized critical rendering paths using Chrome DevTools Performance auditing to break up heavy Evaluate Script tasks."
            ]
        }
    ]'::JSONB,
    -- Projects: JSONB (Including your Portfolio 1.0.0)
    '[
        {
            "title": "Mayur_OS Portfolio v1.0.4",
            "tech": "Next.js 15, PostgreSQL, jose (Edge Auth), Docker, AWS",
            "details": [
                "Achieved 95+ Lighthouse scores by implementing a Dynamic Bridge Pattern for client components.",
                "Reduced initial JS payload by ~40% through selective hydration and route-based code splitting.",
                "Integrated JSON-LD (Linked Data) for automated technical SEO and semantic crawlability."
            ],
            "link": "https://github.com/thissidemayur/portfolio-2.0.0"
        },
        {
            "title": "Terraform State Guardian",
            "tech": "Go, PostgreSQL, Terraform",
            "details": [
                "Developed a custom HTTP backend for Terraform state management with PostgreSQL row-level security.",
                "Implemented atomic state locking to prevent concurrency corruption in multi-dev environments."
            ],
            "link": "https://github.com/thissidemayur/tf-guardian"
        }
    ]'::JSONB,
    -- Achievements: JSONB
    '["Engineered a sub-300ms FCP Portfolio System", "Automated Infrastructure deployment using Terraform & AWS ECS"]'::JSONB,
    -- Education: JSONB
    '[
        {
            "institution": "Lovely Professional University (LPU)",
            "degree": "B.Tech in Computer Science",
            "score": "8.5 CGPA",
            "location": "Punjab, India",
            "duration": "2022 - 2026"
        }
    ]'::JSONB
);





-- 4. SEED Certificates
-- 4. SEED Certificates (Updated S3 Paths)
INSERT INTO certificates (
    title, 
    issuer, 
    issue_date, 
    image_url, 
    verify_link, 
    slug, 
    is_industry_standard, 
    show_on_home
) VALUES 
(
    'Postman API Fundamentals Student Expert',
    'Postman',
    '2025-05-16',
    'https://mayur-portfolio-123.s3.ap-south-1.amazonaws.com/certifications/apiFundamental.webp',
    'https://badges.parchment.com/public/assertions/IA6_OOSJRL-bP4cnYrFDCQ?identity__email=mayurpal7890@gmail.com',
    'postman-api-fundamentals',
    true,
    true
),
(
    'Introduction to Software Engineering',
    'Coursera (IBM)',
    '2024-09-27',
    'https://mayur-portfolio-123.s3.ap-south-1.amazonaws.com/certifications/swEngineering.webp',
    'https://www.coursera.org/account/accomplishments/verify/B7A6FJZJ7WLG',
    'intro-to-software-engineering',
    true,
    true
),
(
    'Javascript (Basic)',
    'HackerRank',
    '2025-02-01',
    'https://mayur-portfolio-123.s3.ap-south-1.amazonaws.com/certifications/js.webp',
    'https://www.hackerrank.com/certificates/iframe/9493f995ff51',
    'hackerrank-javascript-basic',
    true,
    false
),
(
    'C for Everyone: Programming Fundamentals',
    'University of California (via Coursera)',
    '2024-09-22',
    'https://mayur-portfolio-123.s3.ap-south-1.amazonaws.com/certifications/cLang.webp',
    'https://www.coursera.org/account/accomplishments/verify/HFQQAEPHMDRR',
    'c-programming-fundamentals',
    false,
    false
),
(
    'Practise Go',
    'CodeChef',
    '2025-05-18',
    'https://mayur-portfolio-123.s3.ap-south-1.amazonaws.com/certifications/golang.webp',
    'https://www.codechef.com/certificates/public/bce89ef',
    'codechef-practise-go',
    false,
    true
),
(
    'Introduction to HTML, CSS, & JavaScript',
    'Coursera (IBM)',
    '2024-10-02',
    'https://mayur-portfolio-123.s3.ap-south-1.amazonaws.com/certifications/htmlCssJS.webp',
    'https://www.coursera.org/account/accomplishments/verify/J748XXN6J1FF',
    'intro-to-web-development',
    true,
    false
)
ON CONFLICT (slug) DO UPDATE SET
    image_url = EXCLUDED.image_url,
    verify_link = EXCLUDED.verify_link,
    show_on_home = EXCLUDED.show_on_home;




-- 5. Blogs
INSERT INTO blogs (
    title, 
    content, 
    summary, 
    image_url, 
    slug, 
    category, 
    is_featured
) VALUES (
    'Optimizing Next.js 15: Breaking the Main Thread Bottleneck',
    '# Optimizing the Critical Rendering Path\n\nWhen building high-performance portfolios, the biggest enemy is **Total Blocking Time (TBT)**. In this deep dive, we explore how I audited the "Mayur_OS" portfolio using Chrome DevTools...\n\n## 1. The Dynamic Bridge Pattern\nBy offloading heavy client-side components to a dynamic bridge, we reduced the initial JavaScript payload by 40%.\n\n## 2. selective Hydration\nWhy hydrate what you can''t see? We implemented Intersection Observers to trigger hydration only for components entering the viewport.',
    'A deep dive into reducing TBT and LCP by auditing the main thread and implementing dynamic component bridging in Next.js 15.',
    '/blogs/nextjs-performance.jpg',
    'optimizing-nextjs-15-main-thread',
    'TECHNICAL',
    true
),
(
    'Edge Authentication: Why I Ditched Traditional Sessions for Jose',
    '# Scaling Auth to the Edge\n\nTraditional session-based authentication requires a database hit for every single request. This is a latency killer. For my portfolio, I moved the security logic to the network edge.\n\n## Why Jose?\n`jose` is a lightweight, zero-dependency library that works perfectly in Next.js Middleware. It allows us to verify JWTs in secure cookies before the request even reaches our server.\n\n## The DevOps Benefit\nBy keeping auth stateless, we eliminate the need for session-store synchronization across regions, making the system globally scalable by default.',
    'Exploring the transition to stateless, JWT-based Edge authentication using the jose library for zero-latency admin security.',
    '/blogs/edge-auth-jose.jpg',
    'edge-authentication-with-jose',
    'TECHNICAL',
    false
);


-- 7. SEED Contact Messages
INSERT INTO contact_messages (name, email, subject, message, is_read) VALUES 
-- 1. Using your provided emails
('Mayur Pal', 'thissidemayur@gmail.com', 'System Handshake', 'Testing the initial database connection for the portfolio inbox.', true),
('Mayur Pal (Personal)', 'itsurmayur@gmail.com', 'Portfolio Feedback', 'The Bento Grid layout is looking very clean. The raw SQL approach is a great flex.', false),
('Mayur Support', 'mayurpal7890@gmail.com', 'Deployment Alert', 'Your latest build of the Nexus Bridge was successfully deployed to production.', true),
('Mayur Admin', 'mayurpal0987@gmail.com', 'Database Maintenance', 'Reminder to run the vacuum and analyze commands on the PostgreSQL instance.', false),

-- 2. Test Emails for Recruiting & Collaboration
('Sarah Chen', 'sarah.recruiter@techcorp.com', 'Job Opportunity: Senior Backend Engineer', 'Hi Mayur, I saw your Go-based microservice project on GitHub. Are you open to a chat?', false),
('John Doe', 'john.tester@gmail.com', 'Bug Report: Mobile Menu', 'Hey, I noticed a slight overflow on the mobile version of your blog page.', false),
('DevOps Global', 'info@devops-global.net', 'Conference Speaking Invitation', 'We would love to have you present your talk on Zero-Allocation Logging in Go.', false),
('Alex Rivera', 'arivera@startup-incubator.io', 'Collaboration Inquiry', 'I am building a similar bridge controller and would love to discuss your worker pool implementation.', false),
('Cloud Monitor', 'no-reply@aws-monitor.com', 'AWS Credit Alert', 'Your monthly AWS credits have been refreshed. Balance: $200.00.', true),
('Ghost User', 'tester99@gmail.com', 'Just checking in', 'This is a test message to ensure the form validation handles long text strings correctly.', false)
ON CONFLICT DO NOTHING;
