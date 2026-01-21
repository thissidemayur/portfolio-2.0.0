import type { MetadataRoute } from "next";
import { getAllProjects } from "@/dal/projects.dal";
import { getAllBlog } from "@/dal/blogs.dal";
import { iBlog, iProject } from "@/types/database";



export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://thissidemayur.me";

  // 1. Fetch Dynamic Data FIRST (to avoid await errors later)
  const [projects, blogs] = await Promise.all([
    getAllProjects(),
    getAllBlog({ limit: 100, offset: 0 }),
  ]);

  // 2. Map Static Routes
  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/blogs",
    "/contact",
    "/certification",
    "/resume",
    "/uses",
  ].map((route) => {
    let frequency: "weekly" | "monthly" | "yearly" = "monthly";
    let priority = 0.8;

    if (route === "") {
        frequency = "weekly";
        priority = 1.0;
    } else if (route === "/resume") {
        frequency = "weekly";
    } else if (route === "/contact") {
        frequency = "yearly";
        priority = 0.5; // Contact pages don't need high priority
    }

    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: frequency ,
      priority: priority,
    };
  });

  // 3. Map Projects (High Priority)
  const projectRoutes = projects.map((project: iProject) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.updated_at || new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const, // Content usually stays same once posted
    priority: 0.9, 
  }));

  // 4. Map Blogs (High Priority)
  const blogRoutes = blogs.map((blog: iBlog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: blog.updated_at || new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}