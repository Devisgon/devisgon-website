import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const widths = [160, 320, 480, 800, 1200, 1600];
const origin = 'https://www.devisgon.com';
export async function prepareImage(buffer, source, output) {
  const meta = await sharp(buffer).metadata();
  const width = meta.autoOrient?.width || meta.width;
  const height = meta.autoOrient?.height || meta.height;
  const result = { source, bytes: buffer.length, width, height, variants: [] };
  if (buffer.length <= 12000 || meta.pages > 1) return result;
  const hash = createHash('sha256').update('webp-82-v1').update(buffer).digest('hex').slice(0, 24);
  for (const size of [...new Set(widths.map(w => Math.min(w, width)))]) {
    const name = `${hash}-${size}.webp`;
    const target = path.join(output, name);
    let bytes;
    try { bytes = (await fs.stat(target)).size; }
    catch {
      const encoded = await sharp(buffer).rotate().resize({ width: size, withoutEnlargement: true }).webp({ quality: 82, effort: 4, smartSubsample: true }).toBuffer();
      await fs.writeFile(target, encoded);
      bytes = encoded.length;
    }
    result.variants.push(size === width && bytes >= buffer.length && meta.format !== 'svg'
      ? { width: size, src: source, bytes: buffer.length }
      : { width: size, src: `/prepared-images/${name}`, bytes });
  }
  return result;
}
async function walk(dir) {
  const files = [];
  for (const item of await fs.readdir(dir, { withFileTypes: true })) {
    if (item.name === 'prepared-images') continue;
    const file = path.join(dir, item.name);
    if (item.isDirectory()) files.push(...await walk(file));
    else if (/\.(png|jpe?g|webp|avif)$/i.test(file)) files.push(file);
  }
  return files.sort();
}
async function download(url) {
  const parsed = new URL(url);
  if (parsed.origin !== origin || !parsed.pathname.startsWith('/api/media')) throw new Error('Unexpected media URL');
  const response = await fetch(parsed, { signal: AbortSignal.timeout(20000), redirect: 'error' });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const chunks = []; let length = 0;
  for await (const chunk of response.body) {
    length += chunk.length;
    if (length > 20 * 1024 * 1024) { throw new Error('Media exceeds 20 MB'); }
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
export async function prepareAll(root = process.cwd(), skipCms = false) {
  const output = path.join(root, 'public/prepared-images');
  await fs.mkdir(output, { recursive: true });
  const manifest = Object.create(null);
  const report = { batches: [], images: [], warnings: [] };
  const files = await walk(path.join(root, 'public'));
  const groups = [[], [], [], []];
  for (const file of files) {
    const source = '/' + path.relative(path.join(root, 'public'), file).split(path.sep).join('/');
    const group = /^\/(home_page|our-work)\//.test(source) ? 0 : source.startsWith('/technologies/') ? 1 : /^\/(all_services|services_page)\//.test(source) ? 2 : 3;
    groups[group].push({ file, source });
  }
  async function add(buffer, source) {
    const record = await prepareImage(buffer, source, output);
    manifest[source] = record.variants;
    report.images.push(record);
  }
  for (let i = 0; i < groups.length; i++) {
    for (const { file, source } of groups[i]) {
      try { await add(await fs.readFile(file), source); }
      catch (error) { report.warnings.push(`${source}: ${error.message}; original retained`); }
    }
    report.batches.push({ batch: i + 1, images: groups[i].length });
    console.log(`Batch ${i + 1}: ${groups[i].length} images`);
  }
  if (!skipCms) {
    try {
      for (let page = 1; page <= 20; page++) {
        const data = JSON.parse((await download(`${origin}/api/media?limit=100&depth=0&page=${page}`)).toString());
        for (const media of data.docs || []) {
          if (!media.url || !media.updatedAt || !/^image\/(png|jpeg|webp|avif|svg\+xml)$/.test(media.mimeType)) continue;
          try {
            const url = new URL(media.url, origin);
            const buffer = await download(url);
            url.searchParams.set('v', media.updatedAt);
            await add(buffer, url.href);
          } catch (error) { report.warnings.push(`CMS ${media.filename}: ${error.message}; direct fallback`); }
        }
        if (!data.hasNextPage) break;
      }
    } catch (error) { report.warnings.push(`CMS unavailable: ${error.message}; direct fallback`); }
  }
  await fs.mkdir(path.join(root, 'src/generated'), { recursive: true });
  await fs.mkdir(path.join(root, '.image-report'), { recursive: true });
  await fs.writeFile(path.join(root, 'src/generated/image-manifest.json'), JSON.stringify(manifest));
  await fs.writeFile(path.join(root, '.image-report/results.json'), JSON.stringify(report, null, 2));
  console.log(`${report.images.length} processed; ${report.warnings.length} warnings`, report.warnings);
  return report;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await prepareAll(process.cwd(), process.argv.includes('--skip-cms'));
