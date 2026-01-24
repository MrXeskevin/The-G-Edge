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
    experimental: {
        // @ts-expect-error - allowedDevOrigins is valid but missing from NextConfig types in this version
        allowedDevOrigins: [
            'localhost:3000',
            '192.168.1.108:3000',
            '192.168.1.108'
        ],
    },
};

export default nextConfig;
