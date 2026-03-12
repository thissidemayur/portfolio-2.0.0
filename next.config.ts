import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
      unoptimized: true,
    
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com", // This covers ALL S3 buckets and regions
      },
      {
        protocol: "https",
        hostname: "mayur-portfolio-123.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "s3.ap-south-1.amazonaws.com", // Regional specific
      },
    ],
  },
  cacheComponents: true,
};

export default nextConfig;
