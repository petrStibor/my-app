/** @type {import('next').NextConfig} */
const nextConfig = {
    // Other configurations
    env: {
      NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    },
  }
  
  module.exports = nextConfig;
  