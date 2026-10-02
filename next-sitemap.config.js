import fs from "fs";
import path from "path";

const BASE_SERVICES_PATH = path.join(
  process.cwd(),
  "src/data/english_data/services",
);

const BASE_INDUSTRIES_PATH = path.join(
  process.cwd(),
  "src/data/english_data/industries",
);

const BASE_TECHNOLOGIES_PATH = path.join(
  process.cwd(),
  "src/data/english_data/technologies",
);

const BASE_PARTNERS_PATH = path.join(
  process.cwd(),
  "src/data/english_data/others",
);

const PRIORITY_SERVICE_SLUGS = new Set([
  "agentic-ai-development-automation-services",
  "ai-agent-development-automation-services",
  "ai-chatbot-development-automation-services",
  "ai-integration-automation-services",
  "computer-vision-ai-development-services",
  "deep-learning-ai-model-development",
  "llm-prompt-engineering-optimization-services",
  "machine-learning-development-services",
  "ai-model-training-development-services",
  "rag-system-development-ai-search-services",
  "ai-recognition-system-development-services",
]);

function getStaticPageUrls() {

  return [
    {
      loc: "/",
      changefreq: "daily",
      priority: 1.0,
    },
    {
      loc: "/services",
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      loc: "/industries",
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      loc: "/technologies",
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      loc: "/get-started",
      changefreq: "weekly",
      priority: 0.85,
    },
    {
      loc: "/contact",
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      loc: "/privacy-policies",
      changefreq: "yearly",
      priority: 0.4,
    },
    {
      loc: "/terms-condition",
      changefreq: "yearly",
      priority: 0.4,
    },
  ];
}

function readJsonFile(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, "");
  return JSON.parse(fileContent);
}

function canonicalSegment(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getFileLastmod(filePath) {
  // Checkout mtimes describe deployment, not a real editorial change.
  const updatedAt = readJsonFile(filePath).updatedAt;
  return updatedAt && !Number.isNaN(Date.parse(updatedAt)) ? new Date(updatedAt).toISOString() : undefined;
}

function getServiceUrls() {
  const urls = [];

  try {
    const folders = fs.readdirSync(BASE_SERVICES_PATH);

    folders.forEach((folder) => {
      const folderPath = path.join(BASE_SERVICES_PATH, folder);

      if (!fs.statSync(folderPath).isDirectory()) {
        return;
      }

      const files = fs.readdirSync(folderPath);

      files.forEach((file) => {
        if (!file.endsWith(".json")) {
          return;
        }

        const filePath = path.join(folderPath, file);
        const fileContent = readJsonFile(filePath);

        const slug = canonicalSegment(
          fileContent.slug || path.basename(file, ".json"),
        );

        if (!slug) {
          return;
        }

        urls.push({
          loc: `/services/${slug}`,
          lastmod: getFileLastmod(filePath),
          changefreq: "weekly",
          priority: PRIORITY_SERVICE_SLUGS.has(slug) ? 0.95 : 0.8,
        });
      });
    });
  } catch (error) {
    console.error("Sitemap service URL generation error:", error);
  }

  return urls;
}

function getIndustryUrls() {
  const urls = [];

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    entries.forEach((entry) => {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
        return;
      }

      if (!entry.isFile() || !entry.name.endsWith(".json")) {
        return;
      }

      const relativePath = path.relative(BASE_INDUSTRIES_PATH, fullPath);
      const pathSegments = relativePath.split(path.sep);

      if (pathSegments.length !== 2) {
        return;
      }

      const fileContent = readJsonFile(fullPath);

      const slug = canonicalSegment(
        fileContent.slug || path.basename(entry.name, ".json"),
      );

      if (!slug) {
        return;
      }

      urls.push({
        loc: `/industries/${slug}`,
        lastmod: getFileLastmod(fullPath),
        changefreq: "weekly",
        priority: 0.8,
      });
    });
  }

  try {
    walk(BASE_INDUSTRIES_PATH);
  } catch (error) {
    console.error("Sitemap industry URL generation error:", error);
  }

  return urls;
}

function getTechnologyUrls() {
  const urls = [];

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    entries.forEach((entry) => {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
        return;
      }

      if (!entry.isFile() || !entry.name.endsWith(".json")) {
        return;
      }

      const fileContent = readJsonFile(fullPath);

      const fallbackSlug =
        entry.name === "index.json"
          ? path.basename(path.dirname(fullPath))
          : path.basename(entry.name, ".json");

      const slug = canonicalSegment(fileContent.slug || fallbackSlug);

      if (!slug) {
        return;
      }

      urls.push({
        loc: `/technologies/${slug}`,
        lastmod: getFileLastmod(fullPath),
        changefreq: "weekly",
        priority: 0.8,
      });
    });
  }

  try {
    walk(BASE_TECHNOLOGIES_PATH);
  } catch (error) {
    console.error("Sitemap technology URL generation error:", error);
  }

  return urls;
}

function getPartnerUrls() {
  const urls = [];

  const partnerSlugMap = {
    "dctr_hosting.json": "doctorhoster",
    "dctr-hosting.json": "doctorhoster",
    "jotform.json": "jotform",
  };

  try {
    const files = fs.readdirSync(BASE_PARTNERS_PATH);

    files.forEach((file) => {
      const mappedSlug = partnerSlugMap[file];

      if (!mappedSlug) {
        return;
      }

      const filePath = path.join(BASE_PARTNERS_PATH, file);
      const slug = canonicalSegment(mappedSlug);

      if (!slug) {
        return;
      }

      urls.push({
        loc: `/partners/${slug}`,
        lastmod: getFileLastmod(filePath),
        changefreq: "monthly",
        priority: 0.6,
      });
    });
  } catch (error) {
    console.error("Sitemap partner URL generation error:", error);
  }

  return urls;
}

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://www.devisgon.com",
  generateIndexSitemap: true,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/", "/my-route"] }],
    additionalSitemaps: ["https://www.devisgon.com/blog-sitemap.xml"],
  },
  sitemapSize: 7000,
  autoLastmod: false,
  changefreq: "weekly",
  priority: 0.7,

  exclude: [
    "/blog-sitemap.xml",
    "/admin",
    "/admin/*",
    "/api",
   
  ],

  transform: async (config, currentPath) => {
    return {
      loc: currentPath,
      changefreq: currentPath === "/" ? "daily" : config.changefreq,
      priority: currentPath === "/" ? 1.0 : config.priority,
    };
  },

  async additionalPaths() {
    const urls = [
      ...getStaticPageUrls(),
      { loc: "/blogs" },
      { loc: "/resources" },
      { loc: "/resources/ai-agent-production-checklist" },
      { loc: "/resources/ai-mvp-scope-checklist" },
      { loc: "/resources/automation-discovery-checklist" },
      { loc: "/tools/automation-roi" },
      ...getServiceUrls(),
      ...getIndustryUrls(),
      ...getTechnologyUrls(),
      ...getPartnerUrls(),
    ];

    return urls.filter(
      (entry, index, entries) =>
        entries.findIndex((candidate) => candidate.loc === entry.loc) === index,
    );
  },
};

export default config;
