import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.paris.fr',
      },
      {
        protocol: 'https',
        hostname: 'i.guim.co.uk',
      }
    ],
    domains: ['i.scdn.co'],
  },
};

export default nextConfig;
