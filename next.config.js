/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  env: {
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  },
};

module.exports = nextConfig;
