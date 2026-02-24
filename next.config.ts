import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      // Local development
      { protocol: "http", hostname: "localhost", port: "3000", pathname: "/**" },

      // Production domain
      { protocol: "https", hostname: "devisgon.com", pathname: "/**" },

      // Supabase storage
      { protocol: "https", hostname: "**.supabase.co", pathname: "/**" },

      // Current S3 bucket used by Payload
      { protocol: "https", hostname: "test-omega-coral-10.vercel.apps3_bucket", pathname: "/**" },
    ],
  },
};

export default withPayload(nextConfig);