import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/others/dctr_hosting",
        destination: "/partners/doctorhoster",
        permanent: true,
      },
      {
        source: "/others/jotform",
        destination: "/partners/jotform",
        permanent: true,
      },
      {
        source: "/partners/dctr_hosting",
        destination: "/partners/doctorhoster",
        permanent: true,
      },
      {
        source: "/partners/dctr-hosting",
        destination: "/partners/doctorhoster",
        permanent: true,
      },
      {
        source: "/privacy_policies",
        destination: "/privacy-policies",
        permanent: true,
      },
      {
        source: "/terms_condition",
        destination: "/terms-condition",
        permanent: true,
      },
      {
        source: "/industries/:category/:slug",
        destination: "/industries/:slug",
        permanent: true,
      },
      {
        source: "/services/ai-and-ml/:slug",
        destination: "/services/:slug",
        permanent: true,
      },
      {
        source: "/services/automations/:slug",
        destination: "/services/:slug",
        permanent: true,
      },
      {
        source: "/services/cloud/:slug",
        destination: "/services/:slug",
        permanent: true,
      },
      {
        source: "/services/data-solutions/:slug",
        destination: "/services/:slug",
        permanent: true,
      },
      {
        source: "/services/design/:slug",
        destination: "/services/:slug",
        permanent: true,
      },
      {
        source: "/services/testing/:slug",
        destination: "/services/:slug",
        permanent: true,
      },
      {
        source: "/services/web-and-saas-development/:slug",
        destination: "/services/:slug",
        permanent: true,
      },
      {
        source: "/services/data_solutions/:slug",
        destination: "/services/:slug",
        permanent: true,
      },
      {
        source: "/services/saas/machine-learning",
        destination: "/services/machine-learning",
        permanent: true,
      },
      {
        source: "/services/saas/machine_learning",
        destination: "/services/machine-learning",
        permanent: true,
      },
      {
        source: "/services/saas/meachine_learning",
        destination: "/services/machine-learning",
        permanent: true,
      },
      {
        source: "/services/web-and-mobile-development/custom-bots",
        destination: "/services/ai-chatbot-development-automation-services",
        permanent: true,
      },
      {
        source: "/services/web-and-mobile-development/custom_bots",
        destination: "/services/ai-chatbot-development-automation-services",
        permanent: true,
      },
      {
        source: "/services/web_and_mobile_development/custom-bots",
        destination: "/services/ai-chatbot-development-automation-services",
        permanent: true,
      },
      {
        source: "/services/web_and_mobile_development/custom_bots",
        destination: "/services/ai-chatbot-development-automation-services",
        permanent: true,
      },
      {
        source: "/services/saas/saas-platform",
        destination: "/services/saas-development",
        permanent: true,
      },
      {
        source: "/services/saas/saas_plateform",
        destination: "/services/saas-development",
        permanent: true,
      },
      {
        source: "/services/saas/:slug",
        destination: "/services/:slug",
        permanent: true,
      },
      {
        source: "/services/web-and-mobile-development/app-applications",
        destination: "/services/mobile-app-development",
        permanent: true,
      },
      {
        source: "/services/web-and-mobile-development/app_applications",
        destination: "/services/mobile-app-development",
        permanent: true,
      },
      {
        source: "/services/web-and-mobile-development/web-applications",
        destination: "/services/web-application-development",
        permanent: true,
      },
      {
        source: "/services/web-and-mobile-development/web_applications",
        destination: "/services/web-application-development",
        permanent: true,
      },
      {
        source: "/services/web-and-mobile-development/:slug",
        destination: "/services/:slug",
        permanent: true,
      },
      {
        source: "/services/web_and_mobile_development/app-applications",
        destination: "/services/mobile-app-development",
        permanent: true,
      },
      {
        source: "/services/web_and_mobile_development/app_applications",
        destination: "/services/mobile-app-development",
        permanent: true,
      },
      {
        source: "/services/web_and_mobile_development/web-applications",
        destination: "/services/web-application-development",
        permanent: true,
      },
      {
        source: "/services/web_and_mobile_development/web_applications",
        destination: "/services/web-application-development",
        permanent: true,
      },
      {
        source: "/services/web_and_mobile_development/:slug",
        destination: "/services/:slug",
        permanent: true,
      },
    ];
  },
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

      // JSON-driven Doctor Hosting hero backgrounds
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },

      // JSON-driven Jotform landing page artwork and integration logos
      { protocol: "https", hostname: "cdn.jotfor.ms", pathname: "/**" },

      // Current S3 bucket used by Payload
      { protocol: "https", hostname: "test-omega-coral-10.vercel.apps3_bucket", pathname: "/**" },
    ],
  },
};

export default withPayload(nextConfig);
