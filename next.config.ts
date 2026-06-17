import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '7skpi1vnag.ufs.sh',
      }
    ]
  }
};

export default nextConfig;
