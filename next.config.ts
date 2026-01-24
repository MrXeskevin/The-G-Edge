import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'crests.football-data.org',
                pathname: '/**',
            },
        ],
    },
    // You can leave experimental empty or remove it entirely
};

export default nextConfig;
