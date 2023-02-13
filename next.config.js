/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['backendapi.flip.onl'],
  },

};

module.exports = nextConfig
