/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['s11.jiuyeb.cn', 'pic1.jiuyebao2015.com'],
  },
};

module.exports = nextConfig;
