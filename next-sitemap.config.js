import fs from "fs";
import path from "path";

const BASE_SERVICES_PATH = path.join(process.cwd(), "src/data/english_data/services");
const BASE_INDUSTRIES_PATH = path.join(process.cwd(), "src/data/english_data/industries");
const BASE_TECHNOLOGIES_PATH = path.join(process.cwd(), "src/data/english_data/technologies");
const BASE_PARTNERS_PATH = path.join(process.cwd(), "src/data/english_data/others");

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
  return fs.statSync(filePath).mtime.toISOString();
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
        const slug = canonicalSegment(fileContent.slug || path.basename(file, ".json"));

        if (!slug) {
          return;
        }

        urls.push({
          loc: `/services/${slug}`,
          lastmod: getFileLastmod(filePath),
          changefreq: "weekly",
          priority: 0.8,
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

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (!entry.isFile() || !entry.name.endsWith(".json")) {
        continue;
      }

      const relativePath = path.relative(BASE_INDUSTRIES_PATH, fullPath);
      const pathSegments = relativePath.split(path.sep);

      if (pathSegments.length !== 2) {
        continue;
      }

      const fileContent = readJsonFile(fullPath);
      const slug = canonicalSegment(fileContent.slug || path.basename(entry.name, ".json"));

      if (!slug) {
        continue;
      }

      urls.push({
        loc: `/industries/${slug}`,
        lastmod: getFileLastmod(fullPath),
        changefreq: "weekly",
        priority: 0.8,
      });
    }
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

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (!entry.isFile() || !entry.name.endsWith(".json")) {
        continue;
      }

      const fileContent = readJsonFile(fullPath);
      const fallbackSlug =
        entry.name === "index.json"
          ? path.basename(path.dirname(fullPath))
          : path.basename(entry.name, ".json");

      const slug = canonicalSegment(fileContent.slug || fallbackSlug);

      if (!slug) {
        continue;
      }

      urls.push({
        loc: `/technologies/${slug}`,
        lastmod: getFileLastmod(fullPath),
        changefreq: "weekly",
        priority: 0.8,
      });
    }
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
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/my-route",
        ],
      },
    ],
  },

  exclude: [
    "/others/*",
    "/partners/dctr_hosting",
    "/partners/dctr-hosting",
    "/privacy_policies",
    "/terms_condition",
    "/industries/*/*",
    "/services/ai-and-ml/*",
    "/services/automations/*",
    "/services/cloud/*",
    "/services/data-solutions/*",
    "/services/design/*",
    "/services/testing/*",
    "/services/web-and-saas-development/*",
    "/services/saas/*",
    "/services/web-and-mobile-development/*",
    "/services/data_solutions/*",
    "/services/digital_design/*",
    "/services/web_and_mobile_development/*",
  ],

  async additionalPaths() {
    return [
      ...getServiceUrls(),
      ...getIndustryUrls(),
      ...getTechnologyUrls(),
      ...getPartnerUrls(),
    ].filter(
      (entry, index, entries) =>
        entries.findIndex((candidate) => candidate.loc === entry.loc) === index,
    );
  },
};

export default config;
