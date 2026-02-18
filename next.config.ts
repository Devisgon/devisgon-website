import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack warning: Avoid complex plugins here while it's experimental
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'test-omega-coral-10.vercel.app' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
};

export default withPayload(nextConfig);