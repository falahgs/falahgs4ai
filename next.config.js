/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-domain.com'], // Add any image domains you're using
    unoptimized: true
  },
  env: {
    GEMINI_API_KEY_VISION: process.env.GEMINI_API_KEY_VISION,
  }
}

module.exports = nextConfig 