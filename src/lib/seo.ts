import type { Metadata } from "next";

type SeoConfig = {
  title: string;
  description: string;
  keywords?: string[];
};

export const SITE_NAME = "Devisgon";
export const SITE_URL = "https://www.devisgon.com";

const LOCAL_SEO_KEYWORDS = [
  "software houses in Okara",
  "software house in Okara",
  "top software houses",
  "best software house in Okara",
  "AI software company ",
  "custom software development ",
  "software company Pakistan",
];

const withLocalKeywords = (keywords: string[] = []) =>
  Array.from(new Set([...keywords, ...LOCAL_SEO_KEYWORDS]));

const toMetadata = ({ title, description, keywords = [] }: SeoConfig): Metadata => ({
  title,
  description,
  keywords,
  openGraph: {
    title,
    description,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
});

export const MAIN_SITE_METADATA = toMetadata({
  title: "Devisgon | AI-Powered Software & Business Automation Agency",
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
});

export const HOME_PAGE_METADATA = toMetadata({
  title: "Devisgon | AI-Powered Software Development & Automation Agency",
  description:
    "Devisgon helps global businesses save 20-50% of time through AI automation, SaaS development, and scalable software solutions. Partner with Pakistan's leading next-gen tech agency.",
  keywords: withLocalKeywords([
    "AI Automation",
    "Software House Pakistan",
    "SaaS Solutions",
    "Devisgon",
  ]),
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
});

export const PRIVACY_PAGE_METADATA = toMetadata({
  title: "Privacy Policy | Devisgon Software Solutions",
  description:
    "Read the Devisgon Privacy Policy to understand how we collect, use, and protect your data. Your privacy and data security are our top priorities.",
  keywords: ["Privacy Policy", "data protection", "Devisgon legal", "software company privacy"],
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
  meachine_learning: {
    title: "Machine Learning Model Development | Devisgon",
    description:
      "Design, train, and deploy machine learning models for prediction, classification, recommendation, and business intelligence.",
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
  const seo = SERVICE_SLUG_SEO[slug];
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
  const seo = INDUSTRY_SLUG_SEO[slug];
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
  dctr_hoasting: {
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
  const seo = TECHNOLOGY_SLUG_SEO[slug];
  if (seo) return toMetadata(seo);

  const fallbackTitle = `${slug.replace(/[-_]/g, " ")} Technology Stack | Devisgon`;
  return toMetadata({
    title: fallbackTitle,
    description:
      "Explore Devisgon technology capabilities across programming languages, frameworks, databases, and tools.",
    keywords: ["technology stack", "software engineering", "Devisgon"],
  });
};
