/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/pokemon',
        permanent: true,
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
