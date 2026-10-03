// Project names and scope come from the owner's supplied project overview.
// No customer metrics or client logos are invented.
export type WorkCategoryId =
  | "website" | "web-app" | "ai" | "voice-agents" | "saas" | "mobile-app"
  | "logo-design" | "ui-ux-design" | "graphic-design" | "seo";

export type WorkCategory = { id: WorkCategoryId; label: string };
export type WorkImageSlot = { title: string; alt: string; src: string; uploadPath: string };
export type WorkSection = { id: string; title: string; summary: string; bullets: string[] };

export const workCategories: WorkCategory[] = [
  { id: "website", label: "Website" },
  { id: "web-app", label: "Web app" },
  { id: "ai", label: "AI" },
  { id: "voice-agents", label: "Voice agents" },
  { id: "saas", label: "SaaS" },
  { id: "mobile-app", label: "Mobile app" },
  { id: "logo-design", label: "Logo design" },
  { id: "ui-ux-design", label: "UI/UX design" },
  { id: "graphic-design", label: "Graphic design" },
  { id: "seo", label: "SEO" },
];

const memyselfiSections: WorkSection[] = [
  { id: "website", title: "Website", summary: "A product-marketing website that introduces the platform and gives each major capability room to explain its value.", bullets: ["Next.js 16, React 19, TypeScript and Tailwind CSS 4", "Product feature pages, responsive navigation, pricing, testimonials and support content", "Server-side contact workflow using Resend", "Search-friendly page structure and metadata"] },
  { id: "web-app", title: "Web app", summary: "A unified productivity workspace connecting personal and business tools in one product experience.", bullets: ["Next.js and React application with feature areas for inbox, calendar, diary, budget and secure vault", "FastAPI/Python AI services and Node.js/Express unified-inbox services", "AWS Cognito authentication with DynamoDB, S3 and vector storage", "Connections across email, messaging and collaboration services"] },
  { id: "mobile-app", title: "Mobile app", summary: "A Flutter mobile client designed to bring core MeMyselfI.ai experiences to mobile.", bullets: ["API-connected sign-in, AI assistant, diary, budget and expenses, and vault flows", "Speech input and output and biometric authentication", "Mobile interfaces for calendar, inbox and call-agent experiences"] },
  { id: "ai", title: "AI", summary: "AI features bring assistance, retrieval and organization into everyday workflows.", bullets: ["OpenAI-powered assistant and agent workflows", "Document intelligence and retrieval using S3 Vectors and FAISS", "Calendar, diary, budgeting, inbox and insight capabilities"] },
  { id: "voice-agents", title: "Voice agents", summary: "Voice experiences combine telephony, speech processing and conversational AI.", bullets: ["Twilio Voice call flows and ElevenLabs voice capabilities", "Whisper transcription and call summaries", "Context-aware assistant and call-agent experiences"] },
  { id: "saas", title: "SaaS platform", summary: "A connected product platform spanning its marketing site, application services and mobile client.", bullets: ["Feature-specific product routes with a consistent platform identity", "Authentication, data, storage and integrations across AWS services", "Resilient service deployment with ECS scaling and monitoring"] },
  { id: "logo-design", title: "Logo design", summary: "A dedicated slot is reserved for the approved MeMyselfI.ai logo artwork.", bullets: ["Upload the final logo to the project media folder and set its path in the project data."] },
  { id: "ui-ux-design", title: "UI/UX design", summary: "Product and marketing interfaces were structured around distinct features within one connected ecosystem.", bullets: ["Responsive marketing and feature-page experience", "Web and mobile interface flows for platform capabilities", "Reusable component architecture and interaction patterns"] },
  { id: "graphic-design", title: "Graphic design", summary: "A gallery slot is ready for selected interface visuals and approved graphic assets.", bullets: ["Add approved screenshots, feature artwork or design exports in the project media folder."] },
  { id: "seo", title: "SEO", summary: "Search foundations were included in the product website delivery.", bullets: ["Feature-specific routes and page metadata", "Technical page structure designed for crawlable product content"] },
  { id: "cloud-deployment", title: "AWS deployment", summary: "The platform was deployed with AWS services supporting its backend and data layer.", bullets: ["AWS ECS services with scaling and monitoring", "Cognito, DynamoDB, S3 and vector database services", "Docker and GitHub Actions deployment workflows", "Marketing frontend deployment on Vercel"] },
  { id: "sqa", title: "SQA and release", summary: "Quality assurance supported delivery across the product surfaces and integrations.", bullets: ["Functional and integration checks across core workflows", "Responsive and cross-surface verification", "Release checks for deployed services and connected APIs"] },
];

export type FeaturedWorkProject = {
  slug: string; name: string; category: string; number: string; title: string; description: string;
  categoryIds: WorkCategoryId[]; focus: string[]; detail: string;
  logoSrc: string; logoDarkSrc: string; logoIconSrc: string; logoIconDarkSrc: string; heroImageSrc: string; logoUploadPath: string; liveUrl: string;
  images: WorkImageSlot[]; sections: WorkSection[]; technologies: string[];
};

export const featuredWork: FeaturedWorkProject[] = [
  {
    slug: "memyselfi-ai", name: "MeMyselfI.ai", category: "AI-powered product", number: "01",
    title: "One AI platform for the many moving parts of life.",
    description: "A connected productivity and life-management platform, delivered across its website, web app, AI services and mobile client.",
    categoryIds: ["website", "web-app", "ai", "voice-agents", "saas", "mobile-app", "logo-design", "ui-ux-design", "graphic-design", "seo"],
    focus: ["Website", "Web app", "Mobile app", "AI", "Voice agents", "AWS deployment", "SQA"],
    detail: "End-to-end product delivery spanning product marketing, application engineering, AI and voice capabilities, mobile, cloud deployment and quality assurance.",
    logoSrc: "/our-work/memyselfi-ai/logo-light.png", logoDarkSrc: "/our-work/memyselfi-ai/logo-dark.png", logoIconSrc: "/our-work/memyselfi-ai/icon-light.png", logoIconDarkSrc: "/our-work/memyselfi-ai/icon-dark.png", heroImageSrc: "/our-work/memyselfi-ai/hero.webp", logoUploadPath: "/our-work/memyselfi-ai/logo-light.png", liveUrl: "",
    images: [
      { title: "Website", alt: "MeMyselfI.ai website screenshot", src: "", uploadPath: "/our-work/memyselfi-ai/website.png" },
      { title: "Web app", alt: "MeMyselfI.ai web app screenshot", src: "", uploadPath: "/our-work/memyselfi-ai/web-app.png" },
      { title: "Mobile app", alt: "MeMyselfI.ai mobile app screenshot", src: "", uploadPath: "/our-work/memyselfi-ai/mobile-app.png" },
      { title: "UI/UX or graphic design", alt: "MeMyselfI.ai design work", src: "", uploadPath: "/our-work/memyselfi-ai/design.png" },
    ],
    sections: memyselfiSections,
    technologies: ["Next.js", "React", "TypeScript", "Flutter", "FastAPI", "Python", "Node.js", "AWS ECS", "Cognito", "DynamoDB", "S3", "OpenAI", "Twilio", "ElevenLabs", "Whisper", "Vercel"],
  },
  {
    slug: "taskera-ai", name: "Taskera AI", category: "Agents & automation", number: "02", title: "Agents with context and tools.",
    description: "A stateful multi-agent assistant with retrieval, MCP tools and task automation.",
    categoryIds: ["ai", "saas"], focus: ["Multi-agent workflows", "RAG", "MCP tools"],
    detail: "Engineering work on a stateful assistant that combines retrieval-augmented generation, connected tools and task automation.",
    logoSrc: "", logoDarkSrc: "", logoIconSrc: "", logoIconDarkSrc: "", heroImageSrc: "", logoUploadPath: "", liveUrl: "", images: [], sections: [], technologies: [],
  },
  {
    slug: "fulixlabs", name: "FulixLabs Backend", category: "AI architecture", number: "03", title: "A foundation for capable AI apps.",
    description: "An enterprise multi-agent backend with tool orchestration, persistent memory and productivity APIs.",
    categoryIds: ["ai"], focus: ["Persistent memory", "Tool orchestration", "Productivity APIs"],
    detail: "Backend engineering work supporting multi-agent assistants through MCP tool orchestration, persistent memory and productivity APIs.",
    logoSrc: "", logoDarkSrc: "", logoIconSrc: "", logoIconDarkSrc: "", heroImageSrc: "", logoUploadPath: "", liveUrl: "", images: [], sections: [], technologies: [],
  },
];

export const getWorkProject = (slug: string) => featuredWork.find((project) => project.slug === slug);
