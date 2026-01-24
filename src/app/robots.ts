import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["app/admin","app/admin/*"],
    },
    sitemap: "'https://thissidemayur.me/sitemap.xml",
  };
}
