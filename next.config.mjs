/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Keen-Keeper',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
};

export default nextConfig;
