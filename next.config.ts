import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'test-omega-coral-10.vercel.app', 
      },
      {
        protocol: 'https',
        hostname: 'your-project-id.supabase.co', 
      },
    ],
  },
};

export default nextConfig;