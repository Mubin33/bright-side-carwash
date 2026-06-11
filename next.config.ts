import type { NextConfig } from "next";

const nextConfig: NextConfig = { 
  allowedDevOrigins: ['192.168.50.130'], 
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
