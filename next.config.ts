import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // helps catch bugs in development
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crests.football-data.org",
        pathname: "/**", // allows all image paths from this host
      },
    ],
  },
  // experimental can be removed entirely since we’re not using it
};

export default nextConfig;
