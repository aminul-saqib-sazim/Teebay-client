/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx"],
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
