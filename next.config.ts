import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to complete even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Add other Next.js config options here if needed.
};

export default nextConfig;
