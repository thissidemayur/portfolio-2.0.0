import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "certs", // Replace with the actual domain if it's different
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mayur-portfolio-123.s3.ap-south-1.amazonaws.com",
        pathname: "/**", // This allows all images under this domain
      },
    ],
  },
  cacheComponents: true,
};

export default nextConfig;
