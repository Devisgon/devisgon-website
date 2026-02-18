import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Opt-in to the new Next 16 caching model (optional but recommended)
  // cacheComponents: true, 

 
  images: {
    // Next 16 increased the default cache TTL to 4 hours
    minimumCacheTTL: 14400, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'test-omega-coral-10.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

export default withPayload(nextConfig);