import fs from "fs";
import path from "path";
import translate from "translate";

translate.engine = "google";

const dataPath = path.join(process.cwd(), "src", "data");
const englishDataDir = path.join(dataPath, "english_data");

const targetLanguages = [
  { folder: "arabic_data", code: "ar" },
  { folder: "chinese_data", code: "zh" },
  { folder: "french_data", code: "fr" },
  { folder: "german_data", code: "de" },
  { folder: "spanish_data", code: "es" },
  { folder: "urdu_data", code: "ur" },
];

const excludeKeys = new Set([
  "slug",
  "lang",
  "locale",
  "code",
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
  "value",
]);

const translationCache = new Map();
let translatedStringCount = 0;
let fallbackStringCount = 0;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function isStaticAssetOrUrl(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return true;
  }

  return (
    trimmed.startsWith("/") ||
    trimmed.startsWith("http") ||
    trimmed.startsWith("#") ||
    /\.(svg|png|jpg|jpeg|webp|gif|avif)$/i.test(trimmed)
  );
}

function isLikelyIdentifier(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return true;
  }

  if (/^[a-z0-9_\-/.:]+$/i.test(trimmed) && !/\s/.test(trimmed)) {
    return true;
  }

  if (/^[A-Z0-9_/-]+$/.test(trimmed) && !/\s/.test(trimmed)) {
    return true;
  }

  return false;
}

function getJsonFilesRecursively(rootDir, relativePrefix = "") {
  const entries = fs.readdirSync(path.join(rootDir, relativePrefix), {
    withFileTypes: true,
  });

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

function normalizeRequestedFile(filePath) {
  const normalizedPath = path.normalize(filePath);
  const englishPrefix = `${path.normalize(path.join("src", "data", "english_data"))}${path.sep}`;

  if (normalizedPath.startsWith(englishPrefix)) {
    return normalizedPath.slice(englishPrefix.length);
  }

  return normalizedPath;
}

function getRequestedJsonFiles() {
  const requestedFiles = process.argv.slice(2);

  if (requestedFiles.length === 0) {
    return getJsonFilesRecursively(englishDataDir);
  }

  return requestedFiles.map((requestedFile) => {
    const relativeFile = normalizeRequestedFile(requestedFile);
    const sourceFilePath = path.join(englishDataDir, relativeFile);

    if (!relativeFile.endsWith(".json")) {
      throw new Error(`Only JSON files can be translated: ${requestedFile}`);
    }

    if (!fs.existsSync(sourceFilePath)) {
      throw new Error(`Source file not found: ${sourceFilePath}`);
    }

    return relativeFile;
  });
}

async function translateString(value, targetLang) {
  if (isStaticAssetOrUrl(value) || isLikelyIdentifier(value)) {
    return value;
  }

  const cacheKey = `${targetLang}::${value}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  let translatedValue = value;
  let hadError = false;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const nextValue = await translate(value, {
        from: "en",
        to: targetLang,
      });

      if (typeof nextValue === "string" && nextValue.trim()) {
        translatedValue = nextValue;
        break;
      }
    } catch {
      hadError = true;
      await delay(250 * attempt);
    }
  }

  if (translatedValue !== value) {
    translatedStringCount += 1;
  } else if (hadError) {
    fallbackStringCount += 1;
  }

  translationCache.set(cacheKey, translatedValue);
  return translatedValue;
}

async function translateObject(value, targetLang) {
  if (typeof value === "string") {
    return translateString(value, targetLang);
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
        continue;
      }

      translatedObject[key] = await translateObject(nestedValue, targetLang);
    }

    return translatedObject;
  }

  return value;
}

async function translateWholeWebsiteData() {
  if (!fs.existsSync(englishDataDir)) {
    throw new Error(`Source directory not found: ${englishDataDir}`);
  }

  const englishJsonFiles = getRequestedJsonFiles();
  let writtenFiles = 0;

  for (const relativeFile of englishJsonFiles) {
    const sourceFilePath = path.join(englishDataDir, relativeFile);
    const englishJson = JSON.parse(fs.readFileSync(sourceFilePath, "utf8"));

    for (const lang of targetLanguages) {
      const targetFilePath = path.join(dataPath, lang.folder, relativeFile);
      fs.mkdirSync(path.dirname(targetFilePath), { recursive: true });

      const translatedJson = await translateObject(englishJson, lang.code);
      fs.writeFileSync(targetFilePath, JSON.stringify(translatedJson, null, 2), "utf8");

      writtenFiles += 1;
      await delay(120);
    }
  }

  return writtenFiles;
}

async function run() {
  const writtenFiles = await translateWholeWebsiteData();
  console.log(`Website data translation completed. Files written: ${writtenFiles}`);
  console.log(`Strings translated: ${translatedStringCount}`);
  console.log(`Strings kept as fallback: ${fallbackStringCount}`);
}

run().catch((error) => {
  console.error("Website data translation failed:", error.message);
  process.exitCode = 1;
});
