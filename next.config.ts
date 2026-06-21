import type { NextConfig } from 'next';
// @ts-expect-error – next-pwa has no bundled types
import withPWA from 'next-pwa';

const nextConfig: NextConfig = {
  // Force webpack so next-pwa's workbox integration works
  turbopack: {},   // silence Turbopack mismatch error
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
};

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})(nextConfig);
