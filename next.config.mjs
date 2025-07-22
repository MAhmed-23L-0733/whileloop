/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix image loading issues for deployment
  images: {
    unoptimized: true,
    domains: [],
    remotePatterns: [],
  },
  // Ensure static files are properly served
  trailingSlash: false,
  // Remove standalone output for Netlify
  // output: "standalone", // Comment this out for Netlify
  // Optimize for deployment
  experimental: {
    optimizePackageImports: ["@imagekit/next"],
  },
  // Environment variables for build
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
  },
  // Webpack configuration for better asset handling
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
