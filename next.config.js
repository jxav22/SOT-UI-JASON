/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      '@/data': path.resolve(__dirname, 'data'),
    });
    return config;
  },
};

module.exports = nextConfig;
