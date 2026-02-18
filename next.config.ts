import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Adding this helps silence Turbopack/Webpack conflict warnings
  turbopack: {}, 
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'test-omega-coral-10.vercel.app', pathname: '/**' },
      { protocol: 'https', hostname: '**.supabase.co', pathname: '/**' },
    ],
  },

};

export default withPayload(nextConfig);