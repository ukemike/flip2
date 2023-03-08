/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['backendapi.flip.onl', 'easy.unikmarketing.org', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;
