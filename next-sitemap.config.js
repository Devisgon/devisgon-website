import fs from "fs";
import path from "path";

const LANGUAGES = ["en", "ur", "ar", "es", "de", "zh", "fr"];
const BASE_SERVICES_PATH = path.join(process.cwd(), "src/data/english_data/services");
const BASE_INDUSTRIES_PATH = path.join(process.cwd(), "src/data/english_data/industries");
const BASE_TECHNOLOGIES_PATH = path.join(process.cwd(), "src/data/english_data/technologies");
const BASE_PARTNERS_PATH = path.join(process.cwd(), "src/data/english_data/others");

const folderToUrlMap = {
  ai_and_ml: "ai-and-ml",
  data_solutions: "data-solutions",
  digital_design: "design",
  workflow_automations: "automations",
  web_and_saas_development: "web-and-saas-development",
};

function readJsonFile(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, "");
  return JSON.parse(fileContent);
}

function canonicalSegment(value) {
  return value.replace(/_/g, "-");
}

function getServiceUrls() {
  const urls = [];

  try {
    const folders = fs.readdirSync(BASE_SERVICES_PATH);

    folders.forEach((folder) => {
      const folderPath = path.join(BASE_SERVICES_PATH, folder);

      if (fs.statSync(folderPath).isDirectory()) {
        const urlSegment = canonicalSegment(folderToUrlMap[folder] || folder);
        const files = fs.readdirSync(folderPath);

        files.forEach((file) => {
          if (!file.endsWith(".json")) {
            return;
          }

          const filePath = path.join(folderPath, file);
          const fileContent = readJsonFile(filePath);
          const slug = fileContent.slug;

          LANGUAGES.forEach((lang) => {
            urls.push(`/services/${urlSegment}/${slug}?lang=${lang}`);
          });
        });
      }
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

      // Only include the new category-based files: industries/<category>/<slug>.json
      if (pathSegments.length !== 2) {
        continue;
      }

      const [category] = pathSegments;
      const fileContent = readJsonFile(fullPath);
      const slug = fileContent.slug || canonicalSegment(path.basename(entry.name, ".json"));

      LANGUAGES.forEach((lang) => {
        urls.push(`/industries/${canonicalSegment(category)}/${canonicalSegment(slug)}?lang=${lang}`);
      });
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

      LANGUAGES.forEach((lang) => {
        urls.push(`/technologies/${canonicalSegment(slug)}?lang=${lang}`);
      });
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
      LANGUAGES.forEach((lang) => {
        urls.push(`/partners/${slug}?lang=${lang}`);
      });
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
  exclude: [
    "/others/*",
    "/partners/dctr_hosting",
    "/privacy_policies",
    "/terms_condition",
    "/services/saas/*",
    "/services/web-and-mobile-development/*",
    "/services/data_solutions/*",
    "/services/digital_design/*",
    "/services/web_and_mobile_development/*",
  ],

  async additionalPaths() {
    const dynamicSlugs = [...getServiceUrls(), ...getIndustryUrls(), ...getTechnologyUrls(), ...getPartnerUrls()];

    return dynamicSlugs.map((url) => ({
      loc: url,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.8,
    }));
  },
};

export default config;
