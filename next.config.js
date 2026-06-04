import { withPayload } from "@payloadcms/next/withPayload";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Production Package Tree-Shaking Optimizations
  experimental: {
    optimizePackageImports: ["react-icons", "country-flag-icons"],
  },

  // 2. SEO Global URL Redirection Mapping
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

  // 3. Build Optimizations
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 4. Remote Image Optimization Security Policies
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "3000", pathname: "/**" },
      { protocol: "https", hostname: "devisgon.com", pathname: "/**" },
      { protocol: "https", hostname: "**.supabase.co", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.jotfor.ms", pathname: "/**" },
      { protocol: "https", hostname: "test-omega-coral-10.vercel.apps3_bucket", pathname: "/**" },
    ],
  },
};

// 5. Unify PayloadCMS and BundleAnalyzer into a clean wrapper pipeline
export default withPayload(withBundleAnalyzer(nextConfig));