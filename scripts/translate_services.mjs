import fs from "fs";
import path from "path";
import translate from "translate";

translate.engine = "google";

const dataPath = path.join(process.cwd(), "src", "data");
const englishIndustriesDir = path.join(dataPath, "english_data", "industries");
const englishIndustriesPagePath = path.join(dataPath, "english_data", "industries_page.json");

const targetLanguages = [
  { folder: "arabic_data", code: "ar" },
  { folder: "chinese_data", code: "zh-cn" },
  { folder: "french_data", code: "fr" },
  { folder: "german_data", code: "de" },
  { folder: "spanish_data", code: "es" },
  { folder: "urdu_data", code: "ur" },
];

const excludeKeys = new Set([
  "slug",
  "icon_type",
  "icon",
  "link",
  "hero_image",
  "side_image",
  "image",
  "link_url",
  "url",
  "href",
  "background_image",
]);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function isStaticAssetOrUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return true;
  }

  return (
    trimmed.startsWith("/") ||
    trimmed.startsWith("http") ||
    /\.(svg|png|jpg|jpeg|webp|gif|avif)$/i.test(trimmed)
  );
}

function getJsonFilesRecursively(rootDir, relativePrefix = "") {
  const entries = fs.readdirSync(path.join(rootDir, relativePrefix), { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = path.join(relativePrefix, entry.name);

    if (entry.isDirectory()) {
      files.push(...getJsonFilesRecursively(rootDir, relativePath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".json")) {
      files.push(relativePath);
    }
  }

  return files;
}

async function translateObject(value, targetLang) {
  if (typeof value === "string") {
    if (isStaticAssetOrUrl(value)) {
      return value;
    }

    try {
      return await translate(value, { from: "en", to: targetLang });
    } catch {
      return value;
    }
  }

  if (Array.isArray(value)) {
    const translatedArray = [];
    for (const item of value) {
      translatedArray.push(await translateObject(item, targetLang));
    }
    return translatedArray;
  }

  if (value && typeof value === "object") {
    const translatedObject = {};

    for (const [key, nestedValue] of Object.entries(value)) {
      if (excludeKeys.has(key)) {
        translatedObject[key] = nestedValue;
      } else {
        translatedObject[key] = await translateObject(nestedValue, targetLang);
      }
    }

    return translatedObject;
  }

  return value;
}

async function translateIndustryFiles() {
  if (!fs.existsSync(englishIndustriesDir)) {
    throw new Error(`Source directory not found: ${englishIndustriesDir}`);
  }

  const englishIndustryFiles = getJsonFilesRecursively(englishIndustriesDir);

  for (const relativeFile of englishIndustryFiles) {
    const sourceFilePath = path.join(englishIndustriesDir, relativeFile);
    const englishJson = JSON.parse(fs.readFileSync(sourceFilePath, "utf8"));

    for (const lang of targetLanguages) {
      const targetFilePath = path.join(dataPath, lang.folder, "industries", relativeFile);
      fs.mkdirSync(path.dirname(targetFilePath), { recursive: true });

      const translatedJson = await translateObject(englishJson, lang.code);
      fs.writeFileSync(targetFilePath, JSON.stringify(translatedJson, null, 2), "utf8");

      await delay(300);
    }
  }
}

async function translateIndustriesPage() {
  if (!fs.existsSync(englishIndustriesPagePath)) {
    return;
  }

  const englishJson = JSON.parse(fs.readFileSync(englishIndustriesPagePath, "utf8"));

  for (const lang of targetLanguages) {
    const targetPath = path.join(dataPath, lang.folder, "industries_page.json");
    const translatedJson = await translateObject(englishJson, lang.code);
    fs.writeFileSync(targetPath, JSON.stringify(translatedJson, null, 2), "utf8");
    await delay(300);
  }
}

async function run() {
  await translateIndustryFiles();
  await translateIndustriesPage();
  console.log("Industries translation completed.");
}

run().catch((error) => {
  console.error("Industries translation failed:", error.message);
  process.exitCode = 1;
});
