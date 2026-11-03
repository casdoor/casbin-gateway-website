import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    // Vercel's image optimization is billed per image and fails with 402 when the quota runs out, so images are served as they are.
    unoptimized: true,
    // The manual's screenshots are served from the casbin CDN.
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.casbin.org' }],
  },
};

export default withMDX(config);
