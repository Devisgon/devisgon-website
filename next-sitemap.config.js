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
  return value.trim().toLowerCase().replace(/[_\s]+/g, "-").replace(/-+/g, "-");
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
        const slug = fileContent.slug || path.basename(file, ".json");

        urls.push(`/services/${canonicalSegment(slug)}`);
      });
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
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
      const slug = fileContent.slug || canonicalSegment(path.basename(entry.name, ".json"));

      urls.push(`/industries/${canonicalSegment(slug)}`);
    }
  }

  try {
    walk(BASE_INDUSTRIES_PATH);
  } catch (error) {
    console.error("Sitemap generation error:", error);
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
      const slug = fileContent.slug || (entry.name === "index.json" ? path.basename(path.dirname(fullPath)) : path.basename(entry.name, ".json"));

      urls.push(`/technologies/${canonicalSegment(slug)}`);
    }
  }

  try {
    walk(BASE_TECHNOLOGIES_PATH);
  } catch (error) {
    console.error("Sitemap generation error:", error);
  }

  return urls;
}

function getPartnerUrls() {
  const urls = [];
  const partnerSlugMap = {
    dctr_hosting: "doctorhoster",
    "dctr-hosting": "doctorhoster",
  };

  try {
    const files = fs.readdirSync(BASE_PARTNERS_PATH);

    files.forEach((file) => {
      if (!file.endsWith(".json")) {
        return;
      }

      const rawSlug = path.basename(file, ".json");
      const slug = canonicalSegment(partnerSlugMap[rawSlug] || rawSlug);

      urls.push(`/partners/${slug}`);
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
  }

  return urls;
}

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://www.devisgon.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/services",
          "/services/",
          "/industries",
          "/industries/",
          "/technologies",
          "/technologies/",
          "/blogs",
          "/blogs/",
          "/partners/doctorhoster",
          "/partners/jotform",
          "/our-process",
          "/contact",
          "/get-started",
          "/privacy-policies",
          "/terms-condition",
        ],
        disallow: [
          "/admin/",
          "/api/",
          "/_next/",
          "/my-route",
          "/*?*",
        ],
        crawlDelay: 10,
      },
    ],
  },
  exclude: [
    "/others/*",
    "/partners/dctr_hosting",
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
    const dynamicSlugs = [...new Set([...getServiceUrls(), ...getIndustryUrls(), ...getTechnologyUrls(), ...getPartnerUrls()])];

    return dynamicSlugs.map((url) => ({
      loc: url,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.8,
    }));
  },
};

export default config;
