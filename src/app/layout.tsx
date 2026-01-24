import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SystemShell from "@/components/home/SystemShell";
import HireMeButton from "@/components/hireButton";
import { NavigationDock } from "@/components/home/NavigationDock";
import { PreloadResources } from "./preload-resources";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thissidemayur.me"),
  title: {
    default: "Mayur Pal | Full-Stack & DevOps Engineer",
    template: "%s | Mayur Pal",
  },
  description:
    "Full-Stack Developer and DevOps enthusiast specializing in Go, Next.js,Mern Stack, Cloud Infrastructure and Devops.",
  keywords: [
    "Mayur Pal",
    "LPU",
    "DevOps Engineer",
    "Full Stack Developer",
    "GoLang Portfolio",
    "thissidemayur",
    "Kubernetes",
    "Docker",
    "AWS",
    "Terraform",
    "Next.js",
    "MERN Stack",
    "Cloud Infrastructure",
    "CI/CD",
    "Microservices",
    "Software Engineer",
    "Portfolio",
    "GitHub",
    "LinkedIn",
    "Instagram",
    "X",
    "Personal Website",
    "Tech Blog",
    "Open Source",
    "Programming",
    "Web Development",
    "Cloud Computing",
    "Infrastructure as Code",
    "Automation",
    "System Design",
    "Internships",
    "Jobs",
    "Tech Jobs",
    "Onsite Jobs",
    "Resume",
  ],
  authors: [{ name: "Mayur Pal" }, { name: "thissidemayur" }],
  creator: "Mayur Pal",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thissidemayur.me",
    title: "Mayur Pal | Full-Stack & DevOps Engineer",
    description:
      "Full-Stack Developer and DevOps enthusiast specializing in Go, Next.js,Mern Stack, Cloud Infrastructure and Devops.",
    siteName: "Mayur Pal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayur Pal | Full-Stack & DevOps Engineer",
    description:
      "Full-Stack Developer and DevOps enthusiast specializing in Go, Next.js,Mern Stack, Cloud Infrastructure and Devops.",
    creator: "@thissidemayur",
  },

  // verifications
  verification: {
    google: "sJj8c0OOiGxeG8QUOsYH5fGynv8D51LNCoghV34xOMw",
    yandex: " 37ffaceba88b786d",
    other: {
      "msvalidate.01": "A7D0D18B9D0E5B9B3FC8646CB9FFDA24",
      "p:domain_verify": "9c914e8344a7d96ca613e59322fb03fa",
      // google-adsense-account - added later
    },
  },
  // Apple PWA settings
  appleWebApp: {
    capable: true,
    title: "Mayur Pal Portfolio",
    statusBarStyle: "black-translucent",
    startupImage: [
      // need to study more about this
      {
        url: "/assets/startup/apple-touch-startup-image-1536x2008.png",
        media:
          "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
  //
  alternates: {
    canonical: "https://thissidemayur.me", // for canonical url to prevent duplicate content issues
    // languages
    //  types- rss+xml(rss-really simple syndication is a type of web feed which allows users and applications to access updates to websites in a standardized, computer-readable format.)
  },
  // applinks- use to
  appLinks: {
    web: {
      url: "https://thissidemayur.me",
      should_fallback: true,
    },
    // ios and android can be added later- once app is developed
  },
  category: "technology",
  bookmarks: "https://thissidemayur.me",
  assets: [
    // cloudinary || aws s3 pdf
  ],
  facebook: {
    appId: " ",
  },
  pinterest: {
    richPin: true,
  },
  generator: "Next.js",
  formatDetection:{
    telephone:false,
    email:false,
    address:false
    
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // JSON-LD structured data for SEO
  const globalSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://thissidemayur.me/#person",
        name: "Mayur Pal",
        url: "https://thissidemayur.me",
        jobTitle: "Full-Stack & DevOps Engineer",
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Lovely Professional University",
        },
        sameAs: [
          "https://github.com/thissidemayur",
          "https://linkedin.com/in/thissidemayur",
          "https://x.com/thissidemayur",
          "https://instagram.com/thissidemayur/",
        ],
        knowsAbout: [
          {
            "@type": "Thing",
            name: "Next.js",
            sameAs: "https://en.wikipedia.org/wiki/Next.js",
          },
          {
            "@type": "Thing",
            name: "DevOps",
            sameAs: "https://en.wikipedia.org/wiki/DevOps",
          },
          {
            "@type": "Thing",
            name: "Cloud Infrastructure",
            sameAs: "https://en.wikipedia.org/wiki/Cloud_computing",
          },
          { "@type": "Thing", name: "MERN Stack" },
          {
            "@type": "Thing",
            name: "Go (Programming Language)",
            sameAs: "https://en.wikipedia.org/wiki/Go_(programming_language)",
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": "https://thissidemayur.me/#organization",
        name: "Mayur Pal | Dev & DevOps Portfolio",
        url: "https://thissidemayur.me",
        logo: "https://thissidemayur.me/icon-512.png",
        founder: { "@id": "https://thissidemayur.me/#person" },
      },
      {
        "@type": "WebSite",
        "@id": "https://thissidemayur.me/#website",
        url: "https://thissidemayur.me",
        name: "Mayur Pal Portfolio",
        publisher: { "@id": "https://thissidemayur.me/#organization" },
      },
    ],
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PreloadResources />
        <SystemShell>
          {children}

          <Footer />
          <NavigationDock/>
          <HireMeButton/>
          <Toaster closeButton richColors position="top-right"/>

        </SystemShell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html:JSON.stringify(globalSchema)}}
        />
      </body>
    </html>
  );
}
