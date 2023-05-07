/** @type {import('next').NextConfig} */
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

module.exports = nextConfig;
