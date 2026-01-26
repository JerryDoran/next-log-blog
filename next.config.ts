import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zmv0ar3vxa.ufs.sh',
      },
      {
        protocol: 'https',
        hostname: 'www.freepik.com',
      },
    ],
  },
};

export default nextConfig;
