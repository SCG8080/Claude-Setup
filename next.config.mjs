/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Claude-Setup',
  assetPrefix: '/Claude-Setup',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
