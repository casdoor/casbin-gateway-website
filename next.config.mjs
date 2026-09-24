import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    // The manual's screenshots are served from the casbin CDN.
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.casbin.org' }],
  },
};

export default withMDX(config);
