import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Turbopack config for Next.js 16 compatibility with next-pwa
  turbopack: {},
};

export default withPWAConfig(nextConfig);
