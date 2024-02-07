/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
    },
    images: {
      domains: ['uurjhsufswacvbavufge.supabase.co'],
    },
  }
  
  module.exports = nextConfig
  