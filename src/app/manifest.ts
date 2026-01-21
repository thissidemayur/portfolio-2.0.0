import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mayur Pal | Full-Stack & DevOps",
    short_name: "Mayur Pal",
    description:
      "Full Stack Developer and DevOps Engineer specializing in high-performance Next.js applications and automated cloud infrastructure.",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose:"maskable"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose:"maskable"
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      
    ],
  };
}
