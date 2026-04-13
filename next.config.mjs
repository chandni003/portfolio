/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // Generate static HTML/CSS/JS into /out
  trailingSlash: true,     // firebase.json expects /page/ routes
  images: {
    unoptimized: true,     // next/image requires a server by default; disable for static export
  },
};

export default nextConfig;
