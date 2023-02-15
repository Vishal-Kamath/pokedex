/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
        source: '/pokemon',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
