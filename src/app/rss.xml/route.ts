import { getAllProjects } from "@/dal/projects.dal";
import { getAllBlog } from "@/dal/blogs.dal";

// Helper function to escape special XML characters
function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&"']/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case '"':
        return "&quot;";
      case "'":
        return "&apos;";
      default:
        return c;
    }
  });
}

export async function GET() {
  const [blogs, projects] = await Promise.all([
    getAllBlog({ offset: 0 }),
    getAllProjects(),
  ]);
  const siteUrl = "https://thissidemayur.me";

  const allContent = [
    ...blogs.map((b) => ({
      ...b,
      type: "Blog",
      url: `${siteUrl}/blog/${b.slug}`,
    })),
    ...projects.map((p) => ({
      ...p,
      type: "Project",
      url: `${siteUrl}/projects/${p.slug}`,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const itemsXml = allContent
    .map(
      (item) => `
      <item>
        <title>[${item.type}] ${escapeXml(item.title)}</title>
        <link>${item.url}</link>
        <description>${escapeXml(item.excerpt || item.description || "")}</description>
        <pubDate>${new Date(item.date).toUTCString()}</pubDate>
        <guid isPermaLink="true">${item.url}</guid>
      </item>`,
    )
    .join("");

  // FIX: Escaped the '&' in the channel title as well
  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>Mayur Pal | Full Stack &amp; Devops Engineers</title>
        <link>${siteUrl}</link>
        <description>The latest projects and technical insights from Mayur Pal.</description>
        <language>en-us</language>
        <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
        ${itemsXml}
      </channel>
    </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
