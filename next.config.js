/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['s11.jiuyeb.cn', 'pic1.jiuyebao2015.com'],
  },
  output: 'standalone',
};

module.exports = nextConfig;
