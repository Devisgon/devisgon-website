import type { Metadata } from "next";
import { toLegacySlug } from "@/lib/slugs";

type SeoConfig = {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  robots?: Metadata["robots"];
};

const MAX_TITLE_LENGTH = 55;

export const SITE_NAME = "Devisgon";
export const SITE_URL = "https://www.devisgon.com";
export const DEFAULT_OPEN_GRAPH_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Devisgon AI software, SaaS, and automation agency",
};

const LOCAL_SEO_KEYWORDS = [
  "software houses in Okara",
  "software house in Okara",
  "top software houses",
  "best software house ",
  "AI software company ",
  "custom software development ",
  "software company Pakistan",
];

const withLocalKeywords = (keywords: string[] = []) =>
  Array.from(new Set([...keywords, ...LOCAL_SEO_KEYWORDS]));

const toAbsoluteUrl = (url?: string) => {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
};

const parseRobots = (robots?: unknown): Metadata["robots"] | undefined => {
  if (!robots) return undefined;
  if (typeof robots !== "string") return robots as Metadata["robots"];

  const directives = robots.toLowerCase();
  return {
    index: !directives.includes("noindex"),
    follow: !directives.includes("nofollow"),
  };
};

const compactSeoTitle = (title: string) => {
  const cleanTitle = title.trim().replace(/\s+/g, " ");

  if (cleanTitle.length <= MAX_TITLE_LENGTH) {
    return cleanTitle;
  }

  const [primaryPart] = cleanTitle.split("|").map((part) => part.trim());
  const brandedTitle = `${primaryPart} | ${SITE_NAME}`;

  if (brandedTitle.length <= MAX_TITLE_LENGTH) {
    return brandedTitle;
  }

  const suffix = ` | ${SITE_NAME}`;
  const maxPrimaryLength = MAX_TITLE_LENGTH - suffix.length;
  return `${primaryPart.slice(0, maxPrimaryLength).trim()}${suffix}`;
};

const uniqueDescription = (description: string) => description.trim().replace(/\s+/g, " ");

const toMetadata = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  robots,
}: SeoConfig): Metadata => {
  const metadataTitle = compactSeoTitle(title);
  const metadataDescription = uniqueDescription(description);
  const absoluteCanonicalUrl = toAbsoluteUrl(canonicalUrl);

  return {
    title: metadataTitle,
    description: metadataDescription,
    keywords,
    alternates: absoluteCanonicalUrl
      ? {
          canonical: absoluteCanonicalUrl,
        }
      : undefined,
    robots,
    openGraph: {
      title: metadataTitle,
      description: metadataDescription,
      siteName: SITE_NAME,
      url: absoluteCanonicalUrl ?? SITE_URL,
      locale: "en_US",
      type: "website",
      images: [DEFAULT_OPEN_GRAPH_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: metadataTitle,
      description: metadataDescription,
      images: [DEFAULT_OPEN_GRAPH_IMAGE.url],
    },
  };
};

const withCanonical = (metadata: Metadata, canonicalUrl?: string): Metadata => {
  const absoluteCanonicalUrl = toAbsoluteUrl(canonicalUrl);

  if (!absoluteCanonicalUrl) {
    return metadata;
  }

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: absoluteCanonicalUrl,
    },
    openGraph:
      metadata.openGraph && typeof metadata.openGraph === "object"
        ? {
            ...metadata.openGraph,
            url: absoluteCanonicalUrl,
          }
        : metadata.openGraph,
  };
};

type JsonSeoSource = {
  title?: string;
  description?: string;
  keywords?: string[] | string;
  meta_title?: string;
  meta_description?: string;
  metaTitle?: string;
  metaDescription?: string;
  primary_keywords?: string[];
  secondary_keywords?: string[];
  seo_keywords?: string[];
  canonical_url?: string;
  canonicalUrl?: string;
  robots?: string;
};

const normalizeKeywords = (...values: Array<unknown>) =>
  Array.from(
    new Set(
      values.flatMap((value) => {
        if (Array.isArray(value)) return value;
        if (typeof value === "string") return value.split(",").map((item) => item.trim());
        return [];
      }),
    ),
  ).filter((keyword): keyword is string => typeof keyword === "string" && keyword.length > 0);

export const getJsonSeoMetadata = (
  source: unknown,
  fallback: Metadata,
  canonicalPath?: string,
): Metadata => {
  if (!source || typeof source !== "object") {
    return withCanonical(fallback, canonicalPath);
  }

  const seo = source as JsonSeoSource;
  const title = seo.title ?? seo.meta_title ?? seo.metaTitle;
  const description = seo.description ?? seo.meta_description ?? seo.metaDescription;
  const canonicalUrl = canonicalPath ?? seo.canonical_url ?? seo.canonicalUrl;

  if (!title || !description) {
    return withCanonical(fallback, canonicalUrl);
  }

  return toMetadata({
    title,
    description,
    keywords: normalizeKeywords(
      seo.keywords,
      seo.primary_keywords,
      seo.secondary_keywords,
      seo.seo_keywords,
    ),
    canonicalUrl,
    robots: parseRobots(seo.robots),
  });
};

export const MAIN_SITE_METADATA = toMetadata({
  title: "Devisgon AI Software Agency",
  description:
    "Devisgon is a leading next-gen technology partner specializing in AI development, SaaS platforms, and intelligent business automation. We help global brands and startups in Pakistan scale faster by saving 20-50% of operational time through smarter software solutions.",
  keywords: withLocalKeywords([
    "Devisgon",
    "AI automation",
    "software development",
    "business automation agency",
    "SaaS development",
    "software house Pakistan",
  ]),
  canonicalUrl: "/",
});

export const HOME_PAGE_METADATA = toMetadata({
  title: "AI Software Development | Devisgon",
  description:
    "Devisgon helps global businesses save 20-50% of time through AI automation, SaaS development, and scalable software solutions. Partner with Pakistan's leading next-gen tech agency.",
  keywords: withLocalKeywords([
    "AI Automation",
    "Software House Pakistan",
    "SaaS Solutions",
    "Devisgon",
  ]),
  canonicalUrl: "/",
});

export const SERVICES_PAGE_METADATA = toMetadata({
  title: "All-in-One IT Services & AI Solutions | Devisgon",
  description:
    "Explore Devisgon's full suite of tech services: from Web & App Development to AI Automation, SaaS, and Cloud Deployment. Tailored digital solutions for global growth.",
  keywords: withLocalKeywords([
    "IT services Pakistan",
    "AI software solutions",
    "digital transformation services",
    "Devisgon services",
    "custom software development",
    "AI and SaaS development services",
    "business automation services",
    "cloud and devops services",
    "data solutions and engineering",
    "digital design services",
    "quality assurance and testing services",
    "web and app application development",
  ]),
  canonicalUrl: "/services",
});

export const INDUSTRIES_PAGE_METADATA = toMetadata({
  title: "Industry Solutions | Devisgon",
  description:
    "Explore Devisgon industry solutions for healthcare, professional services, trades, entertainment, and agriculture powered by AI automation and modern software systems.",
  keywords: withLocalKeywords([
    "industry AI solutions",
    "healthcare AI operations",
    "professional services automation",
    "trades workflow intelligence",
    "hospitality and entertainment automation",
    "agriculture operations AI",
    "healthcare workflow AI",
    "industry workflow automation",
  ]),
  canonicalUrl: "/industries",
});

export const TECHNOLOGIES_PAGE_METADATA = toMetadata({
  title: "Technologies | Devisgon Engineering Stack",
  description:
    "Explore Devisgon's technology stack across languages, frameworks, databases, and automation tools used to ship scalable products.",
  keywords: withLocalKeywords([
    "software technologies",
    "engineering stack",
    "programming languages",
    "frameworks",
    "database technologies",
    "automation tools",
  ]),
  canonicalUrl: "/technologies",
});

export const PRIVACY_PAGE_METADATA = toMetadata({
  title: "Privacy Policy | Devisgon Software Solutions",
  description:
    "Read the Devisgon Privacy Policy to understand how we collect, use, and protect your data. Your privacy and data security are our top priorities.",
  keywords: ["Privacy Policy", "data protection", "Devisgon legal", "software company privacy"],
  canonicalUrl: "/privacy-policies",
});

export const TERMS_PAGE_METADATA = toMetadata({
  title: "Terms & Conditions | Devisgon Official",
  description:
    "Review the terms and conditions for using Devisgon's services and website. Legal guidelines for our AI and software development partnerships.",
  keywords: [
    "Terms of service",
    "Devisgon terms and conditions",
    "legal agreement",
    "software service terms",
  ],
  canonicalUrl: "/terms-condition",
});

export const CONTACT_PAGE_METADATA = toMetadata({
  title: "Contact Devisgon | Start Your AI & Software Journey",
  description:
    "Ready to scale your business? Contact Devisgon today for a free consultation on AI automation, web development, and cloud solutions from our Okara, Pakistan team.",
  keywords: withLocalKeywords([
    "Contact Software House",
    "Hire AI Developers",
    "Devisgon Office Pakistan",
  ]),
  canonicalUrl: "/contact",
});

export const BLOGS_PAGE_METADATA = toMetadata({
  title: "Software & AI Blogs | Devisgon Insights",
  description:
    "Read Devisgon blogs on AI automation, SaaS engineering, software development, cloud, and business growth from our team in Okara, Pakistan.",
  keywords: withLocalKeywords([
    "software development blog",
    "AI automation blog",
    "SaaS development insights",
    "tech blog Pakistan",
  ]),
  canonicalUrl: "/blogs",
});

export const GET_STARTED_PAGE_METADATA = toMetadata({
  title: "Get Started with Devisgon | Project and Career Inquiry",
  description:
    "Start a project, apply for active roles, or send your details to the Devisgon team through the get started form.",
  keywords: withLocalKeywords([
    "get started Devisgon",
    "software project inquiry",
    "apply Devisgon",
    "start software project",
  ]),
  canonicalUrl: "/get-started",
});

export const DOCTORHOSTER_PAGE_METADATA = toMetadata({
  title: "Doctor Hosting Plans | Devisgon",
  description:
    "Explore Doctor Hosting domain search, hosting platforms, managed services, pricing cards, and support options.",
  keywords: ["Doctor Hosting", "domain search", "hosting plans", "Devisgon partners"],
  canonicalUrl: "/partners/doctorhoster",
});

export const JOTFORM_PAGE_METADATA = toMetadata({
  title: "Jotform Online Forms | Devisgon",
  description:
    "Use Jotform to collect leads, registrations, payments, signatures, and approvals with a clean no-code workflow.",
  keywords: ["Jotform", "online forms", "form automation", "Devisgon partners"],
  canonicalUrl: "/partners/jotform",
});

export const getBlogPostMetadata = ({
  slug,
  title,
}: {
  slug: string;
  title: string;
}): Metadata =>
  toMetadata({
    title: `${title} | Devisgon Blog`,
    description: `Read "${title}" from Devisgon for practical insight on AI, software, automation, SaaS, and modern digital systems.`,
    keywords: withLocalKeywords(["Devisgon blog", "AI insights", "software development insights"]),
    canonicalUrl: `/blogs/${slug}`,
  });

type SiteNavigationLink = {
  name: string;
  path: string;
  description: string;
};

const SITE_NAVIGATION_LINKS: SiteNavigationLink[] = [
  {
    name: "Home",
    path: "/",
    description: "Devisgon homepage with company overview and core service highlights.",
  },
  {
    name: "Services",
    path: "/services",
    description: "Explore AI, SaaS, cloud, data, testing, and software development services.",
  },
  {
    name: "Industries",
    path: "/industries",
    description:
      "Explore Devisgon industry solutions for healthcare, professional services, trades, entertainment, and agriculture.",
  },
  {
    name: "Technologies",
    path: "/technologies",
    description:
      "Explore Devisgon technology stack for languages, frameworks, databases, and tools.",
  },
  {
    name: "Blogs",
    path: "/blogs",
    description: "Read Devisgon insights and updates on software, AI, and automation.",
  },
  {
    name: "Our Process",
    path: "/our-process",
    description:
      "Review Devisgon's discovery, planning, development, testing, launch, and maintenance process.",
  },
  {
    name: "Contact Us",
    path: "/contact",
    description: "Contact our team for project consultation and software support.",
  },
  {
    name: "Get Started Form",
    path: "/get-started",
    description: "Submit your details through our form to start your project or application.",
  },
];

export const getWebsiteStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Devisgon provides AI, SaaS, automation, and software development services in Okara, Pakistan and worldwide.",
  keywords: withLocalKeywords(["Devisgon", "AI software solutions", "software development"]),
});

export const getSiteNavigationStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Devisgon Primary Site Links",
  itemListElement: SITE_NAVIGATION_LINKS.map((link, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: link.name,
    description: link.description,
    url: `${SITE_URL}${link.path}`,
  })),
});

const SERVICE_SLUG_SEO: Record<string, SeoConfig> = {
  ai_powered_app: {
    title: "AI Powered App Development | Devisgon",
    description:
      "Build AI powered apps with automation, smart features, personalized experiences, and production-ready architecture.",
    keywords: ["AI powered app development", "AI app development", "Devisgon"],
  },
  machine_learning: {
    title: "Machine Learning Model Development | Devisgon",
    description:
      "Design, train, and deploy machine learning models for prediction, classification, recommendation, and business intelligence.",
    keywords: ["machine learning models", "ML development", "Devisgon"],
  },
  meachine_learning: {
    title: "Machine Learning Services | Devisgon",
    description:
      "Plan and launch practical machine learning systems for predictions, classification, recommendations, and analytics workflows.",
    keywords: ["machine learning models", "ML development", "Devisgon"],
  },
  mvps: {
    title: "MVP and POC Development Services | Devisgon",
    description:
      "Fast MVP and proof of concept development to validate ideas, reduce risk, and launch quickly.",
    keywords: ["MVP development", "POC development", "Devisgon"],
  },
  saas_plateform: {
    title: "SaaS Platform Development | Devisgon",
    description:
      "End-to-end SaaS platform development with secure architecture, subscriptions, dashboards, and scalable cloud deployment.",
    keywords: ["SaaS platform development", "SaaS solutions", "Devisgon"],
  },
  ai_powered_automation: {
    title: "AI Powered Automation Solutions | Devisgon",
    description:
      "AI powered automation for smart workflows, decision support, content processing, and intelligent operations.",
    keywords: ["AI automation", "intelligent automation", "Devisgon"],
  },
  api_integration: {
    title: "API Integration Automation | Devisgon",
    description:
      "Connect apps, tools, and services with reliable API integration automation for seamless data flow and workflow execution.",
    keywords: ["API integration automation", "workflow integration", "Devisgon"],
  },
  business_process_automation: {
    title: "Business Process Automation Services | Devisgon",
    description:
      "Streamline operations with business process automation for approvals, records, notifications, and system workflows.",
    keywords: ["business process automation", "BPA services", "Devisgon"],
  },
  accounting: {
    title: "Financial Automation Solutions | Devisgon",
    description:
      "Automate finance workflows including reports, reconciliations, billing, tracking, and process efficiency.",
    keywords: ["financial automation", "finance workflow automation", "Devisgon"],
  },
  "devops-infrastructure-automation": {
    title: "Infrastructure Automation Services | Devisgon",
    description:
      "Automate infrastructure setup, deployment, scaling, monitoring, and maintenance across modern cloud environments.",
    keywords: ["infrastructure automation", "DevOps automation", "Devisgon"],
  },
  low_code_automations: {
    title: "Low Code Automation Development | Devisgon",
    description:
      "Build fast and flexible low code automation systems for business operations, integrations, and task management.",
    keywords: ["low code automation", "workflow automation", "Devisgon"],
  },
  no_code_automations: {
    title: "Business Automation Services | Devisgon",
    description:
      "Automate repetitive business tasks, reduce manual work, and improve accuracy with custom automation systems.",
    keywords: ["business automation", "no code automation", "Devisgon"],
  },
  "marketing-sales-automation": {
    title: "Marketing and Sales Automation | Devisgon",
    description:
      "Automate lead capture, follow-ups, CRM actions, campaigns, and sales workflows for better conversion and growth.",
    keywords: ["marketing sales automation", "sales automation", "Devisgon"],
  },
  "robotic-process-automation": {
    title: "Robotic Process Automation Services | Devisgon",
    description:
      "RPA solutions for repetitive digital tasks, structured processes, and enterprise workflow efficiency.",
    keywords: ["robotic process automation", "RPA services", "Devisgon"],
  },
  cicd_pipelines: {
    title: "CI/CD Pipeline Development | Devisgon",
    description:
      "Build secure CI/CD pipelines for automated testing, deployment, release management, and faster software delivery.",
    keywords: ["CI CD pipelines", "CI/CD development", "Devisgon"],
  },
  cloud_security: {
    title: "Cloud Security Services | Devisgon",
    description:
      "Cloud security solutions for access control, configuration hardening, monitoring, and risk reduction.",
    keywords: ["cloud security", "cloud protection", "Devisgon"],
  },
  database_management: {
    title: "Database Management Services | Devisgon",
    description:
      "Database design, optimization, maintenance, migration, and performance management for reliable systems.",
    keywords: ["database management", "database optimization", "Devisgon"],
  },
  devops_consulting: {
    title: "DevOps Consulting Services | Devisgon",
    description:
      "DevOps consulting for delivery workflows, infrastructure strategy, monitoring, automation, and operational improvement.",
    keywords: ["DevOps consulting", "cloud and devops", "Devisgon"],
  },
  ai_ml_models: {
    title: "AI Model Development Services | Devisgon",
    description:
      "Build and deploy AI models for automation, predictions, smart features, and domain-specific use cases.",
    keywords: ["AI models", "AI model development", "Devisgon"],
  },
  business_analytics: {
    title: "Business Analytics Services | Devisgon",
    description:
      "Business analytics services to turn raw data into actionable insights, trends, and decision support.",
    keywords: ["business analytics", "data insights", "Devisgon"],
  },
  data_analytics_dashboard: {
    title: "Data Analytics Dashboard Development | Devisgon",
    description:
      "Interactive analytics dashboards for KPI tracking, reporting, visual insights, and business monitoring.",
    keywords: ["data analytics dashboard", "analytics dashboard", "Devisgon"],
  },
  data_scraping: {
    title: "Data Scraping Services | Devisgon",
    description:
      "Automated data scraping solutions for websites, structured extraction, research, and business intelligence.",
    keywords: ["data scraping", "web data extraction", "Devisgon"],
  },
  graphic_design: {
    title: "Graphic and Virtual Design Services | Devisgon",
    description:
      "Creative graphic and virtual design solutions for visual branding, digital assets, and business presentation.",
    keywords: ["graphic design services", "digital design", "Devisgon"],
  },
  logo_design: {
    title: "Custom Logo Design Services | Devisgon",
    description:
      "Custom logo design for strong brand identity, visual recognition, and professional business presence.",
    keywords: ["logo design", "brand identity", "Devisgon"],
  },
  mobile_app_design: {
    title: "Mobile App Design Services | Devisgon",
    description:
      "Mobile app design focused on usability, clean interfaces, user journeys, and product clarity.",
    keywords: ["mobile app design", "app UI design", "Devisgon"],
  },
  product_design: {
    title: "Product Design Services | Devisgon",
    description:
      "Product design services for digital products, feature planning, interface logic, and user-centered experiences.",
    keywords: ["product design", "digital product design", "Devisgon"],
  },
  prototyping_wireframing: {
    title: "Prototyping and Wireframing Services | Devisgon",
    description:
      "Wireframes and prototypes for product planning, validation, user flow testing, and design clarity.",
    keywords: ["wireframes and prototypes", "prototyping services", "Devisgon"],
  },
  ui_ux_design: {
    title: "UI UX Design Services | Devisgon",
    description:
      "UI UX design for intuitive interfaces, strong usability, better engagement, and conversion-focused experiences.",
    keywords: ["UI UX design", "user experience design", "Devisgon"],
  },
  web_design: {
    title: "Web Design Services | Devisgon",
    description:
      "Professional web design for modern websites, responsive layouts, strong branding, and clear user experience.",
    keywords: ["web design", "website design services", "Devisgon"],
  },
  api_testing: {
    title: "API Testing Services | Devisgon",
    description:
      "API testing services for validation, reliability, performance, and secure backend integration quality.",
    keywords: ["API testing", "backend testing", "Devisgon"],
  },
  automation_testing: {
    title: "Automation Testing Services | Devisgon",
    description:
      "Automation testing services for repeatable validation, regression coverage, and faster software delivery.",
    keywords: ["automation testing", "QA automation", "Devisgon"],
  },
  manual_testing: {
    title: "Manual Testing Services | Devisgon",
    description:
      "Manual testing for usability checks, exploratory validation, bug discovery, and release confidence.",
    keywords: ["manual testing", "software QA", "Devisgon"],
  },
  performance_testing: {
    title: "Performance Testing Services | Devisgon",
    description:
      "Performance testing to identify bottlenecks, improve speed, and validate system stability under load.",
    keywords: ["performance testing", "load testing", "Devisgon"],
  },
  security_testing: {
    title: "Security Testing Services | Devisgon",
    description:
      "Security testing services to identify vulnerabilities, reduce risk, and improve application protection.",
    keywords: ["security testing", "application security testing", "Devisgon"],
  },
  app_applications: {
    title: "Web and App Application Development | Devisgon",
    description:
      "Custom development for web and app applications with scalable architecture and modern user experiences.",
    keywords: ["web and app development", "application development", "Devisgon"],
  },
  custom_bots: {
    title: "Custom Bot Development | Devisgon",
    description:
      "Build custom bots for support, workflow automation, business tasks, and AI-powered interactions.",
    keywords: ["custom bots", "AI bots", "Devisgon"],
  },
  web_applications: {
    title: "Web Application Development | Devisgon",
    description:
      "Custom web application development for dashboards, portals, SaaS products, and business platforms.",
    keywords: ["web application development", "custom web apps", "Devisgon"],
  },
};

export const getServiceSlugMetadata = (slug: string): Metadata => {
  const seo = SERVICE_SLUG_SEO[slug] ?? SERVICE_SLUG_SEO[toLegacySlug(slug)];
  if (seo) return toMetadata(seo);

  const fallbackTitle = `${slug.replace(/[-_]/g, " ")} | Devisgon`;
  return toMetadata({
    title: fallbackTitle,
    description:
      "Custom AI, SaaS, automation, cloud, testing, and software development services by Devisgon.",
    keywords: ["Devisgon services", "custom software development", "AI software solutions"],
  });
};

const INDUSTRY_SLUG_SEO: Record<string, SeoConfig> = {
  manufacturing: {
    title: "AI Manufacturing Solutions | Devisgon",
    description:
      "Modernize manufacturing operations with AI-driven dashboards, predictive maintenance, and production workflow automation.",
    keywords: ["manufacturing AI", "factory automation", "predictive maintenance", "Devisgon"],
  },
  healthcare: {
    title: "Healthcare Workflow AI Solutions | Devisgon",
    description:
      "Improve care delivery with healthcare AI systems for coordination, predictive alerts, and streamlined clinical operations.",
    keywords: ["healthcare AI", "clinical workflow automation", "care operations", "Devisgon"],
  },
  energy: {
    title: "Energy Operations Intelligence | Devisgon",
    description:
      "Optimize grid and energy operations using predictive analytics, live telemetry, and intelligent automation systems.",
    keywords: ["energy AI", "grid intelligence", "predictive load modeling", "Devisgon"],
  },
  finance: {
    title: "Finance Automation and Risk Intelligence | Devisgon",
    description:
      "Strengthen compliance and transaction operations with AI-powered risk analysis, fraud detection, and workflow automation.",
    keywords: ["finance AI", "fraud detection automation", "risk intelligence", "Devisgon"],
  },
};

export const getIndustrySlugMetadata = (slug: string): Metadata => {
  const seo = INDUSTRY_SLUG_SEO[slug] ?? INDUSTRY_SLUG_SEO[toLegacySlug(slug)];
  if (seo) return toMetadata(seo);

  const fallbackTitle = `${slug.replace(/[-_]/g, " ")} Industry Solutions | Devisgon`;
  return toMetadata({
    title: fallbackTitle,
    description:
      "Industry-specific AI, automation, and software solutions by Devisgon for modern operational excellence.",
    keywords: ["industry solutions", "AI operations", "Devisgon"],
  });
};

const TECHNOLOGY_SLUG_SEO: Record<string, SeoConfig> = {
  languages: {
    title: "Programming Languages Stack | Devisgon",
    description:
      "Discover Devisgon's language stack including Java, JavaScript, Python, TypeScript, PHP, C++, and C for scalable engineering.",
    keywords: ["programming languages", "JavaScript", "Python", "TypeScript", "software architecture"],
  },
  frameworks: {
    title: "Framework Stack | Devisgon",
    description:
      "Explore Node.js, Next.js, NestJS, Laravel, React, React Native, and Flutter in Devisgon's delivery framework stack.",
    keywords: ["framework stack", "Node.js", "Next.js", "React", "Flutter", "NestJS"],
  },
  database: {
    title: "Database Stack | Devisgon",
    description:
      "Learn how Devisgon builds data systems with Supabase, MongoDB, GraphQL, MySQL, and Amazon DynamoDB.",
    keywords: ["database stack", "Supabase", "MongoDB", "GraphQL", "MySQL", "DynamoDB"],
  },
  tools: {
    title: "Automation and Product Tools | Devisgon",
    description:
      "See the tools Devisgon uses for automation and product operations, including n8n, Make, Zapier, Amazon, Shopify, and WordPress.",
    keywords: ["automation tools", "n8n", "Make", "Zapier", "Shopify", "WordPress"],
  },
  doctorhosters: {
    title: "DoctorHoster Hosting Platform | Devisgon",
    description:
      "Explore DoctorHoster hosting and domain capabilities with Devisgon meeting support and a dedicated landing page.",
    keywords: ["DoctorHoster", "web hosting", "domain hosting", "Devisgon"],
  },
  jotform: {
    title: "Jotform Form Automation | Devisgon",
    description:
      "Explore Jotform for forms, payments, approvals, signatures, and connected no-code intake workflows with Devisgon.",
    keywords: ["Jotform", "form automation", "online forms", "workflow intake", "Devisgon"],
  },
};

export const getTechnologySlugMetadata = (slug: string): Metadata => {
  const seo = TECHNOLOGY_SLUG_SEO[slug] ?? TECHNOLOGY_SLUG_SEO[toLegacySlug(slug)];
  if (seo) return toMetadata(seo);

  const fallbackTitle = `${slug.replace(/[-_]/g, " ")} Technology Stack | Devisgon`;
  return toMetadata({
    title: fallbackTitle,
    description:
      "Explore Devisgon technology capabilities across programming languages, frameworks, databases, and tools.",
    keywords: ["technology stack", "software engineering", "Devisgon"],
  });
};
