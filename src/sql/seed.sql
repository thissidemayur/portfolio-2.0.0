-- 1. SEED Technologies 
INSERT INTO technologies (name,category,icon_slug,is_main_stack)
VALUES 
('Go', 'languages & runtimes', 'cpu', true),
('TypeScript', 'languages & runtimes', 'code', true),
('C', 'languages & runtimes', 'terminal', true),
('C++', 'languages & runtimes', 'terminal', true),
('JavaScript', 'languages & runtimes', 'terminal', true),
('BashScript', 'languages & runtimes', 'terminal', true),

('Next.js', 'frontend', 'layers', true),
('TailwindCSS', 'frontend', 'palette', true),
('React', 'frontend', 'react', true),
('Redux', 'frontend', 'redux', true),
('zustand', 'frontend', 'database', true),

('Node.js', 'backend', 'nodejs', true),
('Express.js', 'backend', 'express', true),
('Rest API', 'backend', 'api', true),

('MongoDB', 'database & ORMs', 'mongodb', true),
('Mongoose', 'database & ORMs', 'database', true),
('Prisma', 'database & ORMs', 'database', true),
('PostgreSQL', 'database & ORMs', 'database', true),
('Redis', 'database & ORMs', 'zap', true),

('Docker', 'devops', 'container', true),
('AWS', 'devops', 'cloud', true),
('Terraform', 'devops', 'box', true),
('GitHub Actions', 'devops', 'github', true),

('Git', 'tools', 'git', true),
('Linux', 'tools', 'linux', true),
('Postman', 'tools', 'postman', true),
('GitHub', 'tools', 'github', true),

('Other', 'other', 'question-mark-circle', true)
ON CONFLICT (name) DO NOTHING;




-- 2. SEED PROJECTS
INSERT INTO projects (
    title, content, summary, image_url, live_url, repo_url, slug, 
    is_featured, problem_statement, solution_approach, key_learnings, challenges_faced
) VALUES 
(
    'Nexus Microservice Bridge',
    'A deep dive into high-concurrency systems using Go...',
    'High-performance system monitoring bridge for distributed nodes.',
    '/projects/nexus.jpg',
    'https://nexus-demo.com',
    'https://github.com/thissidemayur/nexus-bridge',
    'nexus-microservice-bridge',
    true,
    'Distributed nodes were experiencing 500ms latency in heartbeat sync.',
    'Implemented a worker-pool pattern with custom TCP buffer management.',
    ARRAY['Low-level networking in Go', 'Buffered channels', 'Zero-allocation JSON'],
    ARRAY['TCP packet fragmentation', 'Managing race conditions']
),
(
    'Sentinel Security Scanner',
    'Automated vulnerability scanning for Docker images...',
    'CLI tool to audit and secure containerized environments.',
    '/projects/sentinel.jpg',
    NULL,
    'https://github.com/thissidemayur/sentinel-scanner',
    'sentinel-security-scanner',
    true,
    'CI/CD pipelines lacked automated security gating for container layers.',
    'Built a wrapper around Clair API with custom reporting in Markdown.',
    ARRAY['Docker API integration', 'Static analysis', 'Go CLI development'],
    ARRAY['Handling large JSON payloads', 'Recursive layer scanning']
),
(
    'KubeOps Dashboard',
    'Real-time Kubernetes cluster visualizer...',
    'A fullstack dashboard to monitor pods and resource consumption.',
    '/projects/kubeops.jpg',
    'https://kubeops.dev',
    'https://github.com/thissidemayur/kube-dash',
    'kubeops-dashboard',
    true,
    'Standard kubectl output is too dense for quick visual health checks.',
    'Used Next.js 15 Server Components to stream data from K8s API via WebSockets.',
    ARRAY['Kubernetes Client-Go', 'WebSocket streaming', 'Next.js 15'],
    ARRAY['API Rate limiting', 'Managing cluster permissions']
),
(
    'Terraform State Guardian',
    'Custom backend for Terraform state management...',
    'Secure state storage with locking using PostgreSQL.',
    '/projects/terraform.jpg',
    NULL,
    'https://github.com/thissidemayur/tf-guardian',
    'terraform-state-guardian',
    false,
    'Shared S3 backends were causing occasional state corruption in large teams.',
    'Implemented an HTTP backend in Go with Postgres Row-Level Security.',
    ARRAY['Infrastructure as Code', 'RLS in Postgres', 'Atomic locking'],
    ARRAY['Handling concurrent state locks', 'Data consistency']
),
(
    'Vortex Cache Engine',
    'Distributed LRU cache with Redis integration...',
    'Sub-millisecond latency cache for high-traffic API endpoints.',
    '/projects/vortex.jpg',
    NULL,
    'https://github.com/thissidemayur/vortex-cache',
    'vortex-cache-engine',
    true,
    'Database bottlenecks were slowing down the main API during peak hours.',
    'Developed a tiered caching strategy (In-memory + Redis backup).',
    ARRAY['Cache eviction algorithms', 'Redis TTL strategies', 'Memory management'],
    ARRAY['Cache stampede prevention', 'Invalidation logic']
)
ON CONFLICT (slug) DO NOTHING;

-- 3. LINK PROJECTS TO TECHNOLOGIES
-- Linking Project 1
INSERT INTO project_technologies (project_id, technology_id)
SELECT p.id, t.id FROM projects p, technologies t 
WHERE p.slug = 'nexus-microservice-bridge' AND t.name IN ('Go', 'Docker', 'PostgreSQL')
ON CONFLICT DO NOTHING;

-- Linking Project 2
INSERT INTO project_technologies (project_id, technology_id)
SELECT p.id, t.id FROM projects p, technologies t 
WHERE p.slug = 'sentinel-security-scanner' AND t.name IN ('Go', 'Docker', 'Bash')
ON CONFLICT DO NOTHING;

-- Linking Project 3
INSERT INTO project_technologies (project_id, technology_id)
SELECT p.id, t.id FROM projects p, technologies t 
WHERE p.slug = 'kubeops-dashboard' AND t.name IN ('Next.js', 'TypeScript', 'Docker', 'AWS')
ON CONFLICT DO NOTHING;

-- Linking Project 4
INSERT INTO project_technologies (project_id, technology_id)
SELECT p.id, t.id FROM projects p, technologies t 
WHERE p.slug = 'terraform-state-guardian' AND t.name IN ('Go', 'PostgreSQL', 'Terraform')
ON CONFLICT DO NOTHING;

-- Linking Project 5
INSERT INTO project_technologies (project_id, technology_id)
SELECT p.id, t.id FROM projects p, technologies t 
WHERE p.slug = 'vortex-cache-engine' AND t.name IN ('Go', 'Redis', 'PostgreSQL')
ON CONFLICT DO NOTHING;







-- 4. SEED Certificates
INSERT INTO certificates (
    title, issuer, issue_date, expiry_date, image_url, verify_link, slug, credential_url, is_industry_standard
) VALUES 
(
    'AWS Certified Solutions Architect – Associate', 'Amazon Web Services', 
    '2024-01-15', '2027-01-15', '/certs/aws-saa.png', 
    'https://aws.amazon.com/verification', 'aws-solutions-architect', 
    'AWS-SEC-12345', true
),
(
    'CKA: Certified Kubernetes Administrator', 'The Linux Foundation', 
    '2024-05-20', NULL, '/certs/cka.png', 
    'https://creatly.com/verify/cka', 'certified-kubernetes-administrator', 
    'LF-88990', true
),
(
    'HashiCorp Certified: Terraform Associate', 'HashiCorp', 
    '2023-11-10', '2025-11-10', '/certs/terraform.png', 
    'https://credly.com/h-terraform', 'terraform-associate', 
    'HC-5544', true
),
(
    'Meta Front-End Developer Professional Certificate', 'Meta', 
    '2023-06-01', NULL, '/certs/meta-frontend.png', 
    'https://coursera.org/verify/meta', 'meta-frontend-dev', 
    'META-FE-99', false
),
(
    'Google Cloud Digital Leader', 'Google Cloud', 
    '2023-02-14', NULL, '/certs/gcp-digital.png', 
    'https://google.com/verify/gcp', 'gcp-digital-leader', 
    'GCP-DL-101', true
),
(
    'CompTIA Security+', 'CompTIA', 
    '2024-08-01', '2027-08-01', '/certs/security-plus.png', 
    'https://comptia.org/verify', 'comptia-security-plus', 
    'COMP-SEC-77', true
),
(
    'PostgreSQL Advanced Optimization', 'EDB', 
    '2025-01-10', NULL, '/certs/postgres-adv.png', 
    'https://edb.com/verify', 'postgres-advanced-optimization', 
    'EDB-PG-500', false
),
(
    'Docker Certified Associate', 'Docker / Mirantis', 
    '2023-04-12', '2025-04-12', '/certs/docker-cert.png', 
    'https://docker.com/verify', 'docker-certified-associate', 
    'DOCK-667', true
),
(
    'Red Hat Certified System Administrator (RHCSA)', 'Red Hat', 
    '2024-09-15', NULL, '/certs/rhcsa.png', 
    'https://redhat.com/verify', 'rhcsa-redhat', 
    'RH-990-11', true
),
(
    'Advanced Go Programming', 'Ardan Labs', 
    '2025-12-01', NULL, '/certs/go-advanced.png', 
    'https://ardanlabs.com/verify', 'advanced-go-programming', 
    'GO-ADV-202', false
)
ON CONFLICT (slug) DO NOTHING;



-- 5. Blogs
INSERT INTO blogs (title, content, summary, image_url, slug, category, is_featured, published_at) VALUES 
-- TECHNICAL BLOGS (System & Backend)
('Understanding Go Scheduler internals', 'The G-P-M model explained...', 'A deep dive into how Go manages concurrency at the OS level.', '/blogs/go-scheduler.jpg', 'go-scheduler-internals', 'technical', true, '2025-10-01'),
('PostgreSQL Indexing: The Hidden Performance Killer', 'Why your B-Trees aren''t working...', 'How to optimize raw SQL queries for high-scale applications.', '/blogs/postgres-indexing.jpg', 'postgres-indexing-performance', 'technical', true, '2025-11-05'),
('Architecting a High-Performance Caching Layer', 'Using Redis vs Memcached...', 'Step-by-step guide to building a sub-millisecond data access layer.', '/blogs/caching-layer.jpg', 'high-performance-caching', 'technical', false, '2025-11-12'),
('Next.js 15: Mastering Server Components', 'The shift from client-side to server...', 'How to leverage React Server Components for SEO and speed.', '/blogs/nextjs15.jpg', 'mastering-nextjs-15', 'technical', true, '2025-12-01'),
('The DevOps Handbook for Fullstack Developers', 'CI/CD pipelines with GitHub Actions...', 'Automating your deployment workflow from zero to production.', '/blogs/devops.jpg', 'devops-handbook', 'technical', false, '2025-12-10'),
('Zero-Allocation Logging in Go', 'Reducing GC pressure with Zap...', 'Techniques to write high-speed logs without clogging the memory.', '/blogs/go-logging.jpg', 'zero-allocation-logging', 'technical', false, '2025-12-15'),
('Building a Custom Load Balancer from Scratch', 'Using Round Robin algorithms...', 'Exploring the networking fundamentals of traffic distribution.', '/blogs/load-balancer.jpg', 'custom-load-balancer', 'technical', false, '2025-12-20'),
('TCP vs UDP: When to Choose What?', 'A comparison for real-time systems...', 'Understanding protocol overhead in low-latency environments.', '/blogs/tcp-udp.jpg', 'tcp-vs-udp', 'technical', false, '2025-12-28'),
('Monitoring Microservices with Prometheus', 'Metrics, Alerts, and Dashboards...', 'How to gain visibility into your distributed systems.', '/blogs/prometheus.jpg', 'monitoring-microservices', 'technical', false, '2026-01-05'),
('Docker Security: Hardening your Containers', 'Avoiding root users and using Alpine...', 'A checklist for shipping secure production images.', '/blogs/docker-security.jpg', 'docker-security-hardening', 'technical', false, '2026-01-10'),
('API Rate Limiting with Redis', 'Leaky Bucket vs Token Bucket...', 'Protecting your backend from brute force and DDoS.', '/blogs/rate-limiting.jpg', 'api-rate-limiting-redis', 'technical', false, '2026-01-15'),

-- PERSONAL BLOGS (Development & Experience)
('Why I switched from Python to Go', 'My journey through type safety...', 'Reflecting on the performance gains and developer experience shift.', '/blogs/python-to-go.jpg', 'switching-to-go', 'personal', true, '2025-09-15'),
('The 10,000 Hour Rule in Software Engineering', 'Is mastery just about time?', 'Discussing deliberate practice and mental models.', '/blogs/mastery.jpg', '10000-hour-rule', 'personal', false, '2025-09-20'),
('My First Production Outage: What I Learned', 'It was a Tuesday at 3 AM...', 'A post-mortem on a database connection leak incident.', '/blogs/outage.jpg', 'first-production-outage', 'personal', true, '2025-10-15'),
('Balancing Fullstack Dev with DevOps Roles', 'Wearing two hats is hard...', 'How to manage system reliability while shipping features.', '/blogs/two-hats.ts', 'balancing-dev-and-ops', 'personal', false, '2025-11-20'),
('The Art of Clean Code in 2026', 'Readability over cleverness...', 'Why your future self will thank you for simple code.', '/blogs/clean-code.jpg', 'clean-code-2026', 'personal', false, '2025-11-25'),
('Why Every Developer Should Learn Raw SQL', 'Escaping the ORM trap...', 'A personal take on why abstraction can be a bottleneck.', '/blogs/learn-raw-sql.jpg', 'why-learn-raw-sql', 'personal', false, '2025-12-05'),
('Overcoming Burnout in a High-Growth Role', 'Taking a step back to move forward...', 'Strategies for long-term sustainability in tech.', '/blogs/burnout.jpg', 'overcoming-burnout', 'personal', false, '2025-12-18'),
('Setting up my Home Lab: 2026 Edition', 'Raspberry Pis and Proxmox...', 'How I practice DevOps concepts in my local environment.', '/blogs/home-lab.jpg', 'home-lab-setup', 'personal', false, '2026-01-02'),
('How to read Technical Documentation effectively', 'Skipping the fluff to find the facts...', 'A guide to learning complex tools in record time.', '/blogs/documentation.jpg', 'reading-docs-effectively', 'personal', false, '2026-01-08'),
('The Importance of Side Projects', 'Building for curiosity, not just resume...', 'Keeping the spark alive outside of work hours.', '/blogs/side-projects.jpg', 'importance-of-side-projects', 'personal', false, '2026-01-18')
ON CONFLICT (slug) DO NOTHING;


-- 6. SEED Resumes`
INSERT INTO resumes (version_name, focus_area, file_url, is_latest) VALUES 
-- Fullstack Focused
('v1.0.0-fullstack', 'fullstack', '/drive/resumes/fs_v1_0_0.pdf', false),
('v1.1.0-fullstack', 'fullstack', '/drive/resumes/fs_v1_1_0.pdf', false),
('v1.2.0-fullstack', 'fullstack', '/drive/resumes/fs_v1_2_0.pdf', true), -- Latest FS

-- Backend Focused
('v1.0.0-backend', 'backend', '/drive/resumes/be_v1_0_0.pdf', false),
('v1.1.0-backend', 'backend', '/drive/resumes/be_v1_1_0.pdf', false),
('v1.2.5-backend', 'backend', '/drive/resumes/be_v1_2_5.pdf', true), -- Latest BE

-- DevOps Focused
('v0.9.0-devops-beta', 'devops', '/drive/resumes/do_v0_9_0.pdf', false),
('v1.0.0-devops', 'devops', '/drive/resumes/do_v1_0_0.pdf', false),
('v1.1.0-devops', 'devops', '/drive/resumes/do_v1_1_0.pdf', false),
('v1.3.0-devops', 'devops', '/drive/resumes/do_v1_3_0.pdf', true), -- Latest DevOps

-- Combined/Mixed
('v2.0.0-specialist', 'devops', '/drive/resumes/specialist_v2.pdf', false)
ON CONFLICT (version_name) DO NOTHING;



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