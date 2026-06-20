/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Removed because we are migrating to Vercel and need API routes!
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
