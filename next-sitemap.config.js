import fs from "fs";
import path from "path";

const LANGUAGES = ["en", "ur", "ar", "es", "de", "zh", "fr"];
const BASE_SERVICES_PATH = path.join(process.cwd(), "src/data/english_data/services");
const BASE_INDUSTRIES_PATH = path.join(process.cwd(), "src/data/english_data/industries");

const folderToUrlMap = {
  "ai_and_saas_developments": "saas",
  "data_solutions": "data_solutions",
  "workflow_automations": "automations",
  "web_and_mobile_development": "web_and_mobile_development"
};

function getServiceUrls() {
  const urls = [];

  try {
    const folders = fs.readdirSync(BASE_SERVICES_PATH);

    folders.forEach((folder) => {
      const folderPath = path.join(BASE_SERVICES_PATH, folder);
      
      if (fs.statSync(folderPath).isDirectory()) {
        const urlSegment = folderToUrlMap[folder] || folder;
        const files = fs.readdirSync(folderPath);

        files.forEach((file) => {
          if (file.endsWith(".json")) {
            const filePath = path.join(folderPath, file);
            const fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
            
            const slug = fileContent.slug ;
            
            LANGUAGES.forEach((lang) => {
              urls.push(`/services/${urlSegment}/${slug}?lang=${lang}`);
            });
          }
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

  try {
    const files = fs.readdirSync(BASE_INDUSTRIES_PATH);

    files.forEach((file) => {
      if (!file.endsWith(".json")) return;

      const filePath = path.join(BASE_INDUSTRIES_PATH, file);
      const fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const slug = fileContent.slug;

      LANGUAGES.forEach((lang) => {
        urls.push(`/industries/${slug}?lang=${lang}`);
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
  
  async additionalPaths() {
    const dynamicSlugs = [...getServiceUrls(), ...getIndustryUrls()];

    return dynamicSlugs.map((url) => ({
      loc: url,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.8,
    }));
  },
};

export default config;
