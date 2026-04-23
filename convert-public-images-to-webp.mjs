#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);

const options = {
  dir: "public",
  quality: 82,
  force: false,
  dryRun: false,
};

const SUPPORTED_EXTENSIONS = new Set([
  ".png",
  ".svg",
  ".jpg",
  ".jpeg",
  ".gif",
  ".bmp",
  ".tif",
  ".tiff",
  ".avif",
  ".heic",
  ".heif",
]);

function printHelp() {
  console.log(
    [
      "Convert image files to WEBP recursively.",
      "",
      "Supported input formats:",
      `  ${Array.from(SUPPORTED_EXTENSIONS).join(", ")}`,
      "",
      "Usage:",
      "  node convert-public-images-to-webp.mjs [options]",
      "",
      "Options:",
      "  --dir <path>       Target directory to scan (default: public)",
      "  --quality <0-100>  WEBP quality (default: 82)",
      "  --force            Re-generate WEBP even if up-to-date",
      "  --dry-run          Show planned conversions without writing files",
      "  --help             Show this help",
    ].join("\n"),
  );
}

for (let i = 0; i < args.length; i++) {
  const arg = args[i];

  if (arg === "--help") {
    printHelp();
    process.exit(0);
  }

  if (arg === "--force") {
    options.force = true;
    continue;
  }

  if (arg === "--dry-run") {
    options.dryRun = true;
    continue;
  }

  if (arg === "--dir") {
    const value = args[++i];
    if (!value) {
      throw new Error("Missing value for --dir");
    }
    options.dir = value;
    continue;
  }

  if (arg === "--quality") {
    const value = Number.parseInt(args[++i], 10);
    if (!Number.isFinite(value) || value < 0 || value > 100) {
      throw new Error("Quality must be an integer between 0 and 100");
    }
    options.quality = value;
    continue;
  }

  throw new Error(`Unknown option: ${arg}`);
}

const rootDir = path.resolve(process.cwd(), options.dir);

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function collectFilesRecursively(dirPath) {
  const files = [];
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFilesRecursively(fullPath)));
      continue;
    }

    if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function isConvertible(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return SUPPORTED_EXTENSIONS.has(ext);
}

function toWebpPath(filePath) {
  const ext = path.extname(filePath);
  return `${filePath.slice(0, -ext.length)}.webp`;
}

function getErrorMessage(error) {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

async function shouldSkipConversion(inputPath, outputPath) {
  if (options.force || !(await exists(outputPath))) {
    return false;
  }

  const [inStat, outStat] = await Promise.all([
    fs.stat(inputPath),
    fs.stat(outputPath),
  ]);

  return outStat.mtimeMs >= inStat.mtimeMs;
}

async function convertToWebp(inputPath, outputPath) {
  await sharp(inputPath, { failOn: "none" })
    .webp({ quality: options.quality })
    .toFile(outputPath);
}

async function run() {
  if (!(await exists(rootDir))) {
    throw new Error(`Directory not found: ${rootDir}`);
  }

  const allFiles = await collectFilesRecursively(rootDir);
  const candidates = allFiles.filter(isConvertible);

  let converted = 0;
  let skipped = 0;
  let failed = 0;

  for (const inputPath of candidates) {
    const outputPath = toWebpPath(inputPath);

    if (await shouldSkipConversion(inputPath, outputPath)) {
      skipped++;
      continue;
    }

    if (options.dryRun) {
      console.log(
        `[dry-run] ${path.relative(process.cwd(), inputPath)} -> ${path.relative(process.cwd(), outputPath)}`,
      );
      converted++;
      continue;
    }

    try {
      await convertToWebp(inputPath, outputPath);
      console.log(
        `${path.relative(process.cwd(), inputPath)} -> ${path.relative(process.cwd(), outputPath)}`,
      );
      converted++;
    } catch (error) {
      failed++;
      console.error(
        `Failed: ${path.relative(process.cwd(), inputPath)} (${getErrorMessage(error)})`,
      );
    }
  }

  console.log(
    `Done. Converted: ${converted}, Skipped: ${skipped}, Failed: ${failed}, Source: ${path.relative(process.cwd(), rootDir) || "."}`,
  );

  if (failed > 0) {
    process.exitCode = 1;
  }
}

run().catch((error) => {
  console.error(`Error: ${getErrorMessage(error)}`);
  process.exit(1);
});
