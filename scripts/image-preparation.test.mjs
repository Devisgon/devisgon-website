import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { prepareImage, prepareAll } from './prepare-images.mjs';
import { resolveStaticImage, mediaImageSource } from '../src/lib/static-image-resolver.mjs';
import nextImage from 'next/image.js';

test('responsive files preserve proportions, never upscale, and are deterministic', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'image-test-'));
  try {
    const source = await sharp({create:{width:1800,height:900,channels:3,background:'#8ba870'}}).png({compressionLevel:0}).toBuffer();
    const result = await prepareImage(source, '/example.png', dir);
    assert.equal(result.variants.length, 6);
    for (const item of result.variants) {
      const buffer = await fs.readFile(path.join(dir,path.basename(item.src)));
      const meta = await sharp(buffer).metadata();
      assert.equal(meta.width, item.width);
      assert.equal(meta.height, item.width / 2);
      assert.ok(item.bytes < source.length);
    }
    assert.deepEqual(await prepareImage(source, '/example.png', dir), result);
  } finally { await fs.rm(dir,{recursive:true,force:true}); }
});
test('small transparent icons remain original', async () => {
  const source = await sharp({create:{width:20,height:20,channels:4,background:'#00000000'}}).png().toBuffer();
  assert.deepEqual((await prepareImage(source,'/icon.png','/unused')).variants,[]);
});
test('loader selects size and safely falls back for unknown sources', () => {
  const manifest = {'/photo.png':[{width:320,src:'/prepared-images/a-320.webp'},{width:800,src:'/prepared-images/a-800.webp'}]};
  assert.equal(resolveStaticImage(manifest,{src:'/photo.png',width:400}),'/prepared-images/a-800.webp');
  for (const src of ['/unknown.png','/photo.png?v=new','__proto__','data:image/png;base64,x']) assert.equal(resolveStaticImage(manifest,{src,width:100}),src);
  const old = mediaImageSource({url:'https://www.devisgon.com/api/media/file/a.png',updatedAt:'old'});
  const current = mediaImageSource({url:'https://www.devisgon.com/api/media/file/a.png',updatedAt:'new'});
  assert.notEqual(old,current);
  assert.equal(resolveStaticImage({[old]:manifest['/photo.png']},{src:current,width:320}),current);
});
test('Next image markup uses static URLs without the optimizer', () => {
  const manifest = {'/photo.png':[{width:1600,src:'/prepared-images/photo.webp'}]};
  const {props} = nextImage.getImageProps({src:'/photo.png',alt:'Photo',width:800,height:400,loader:p=>resolveStaticImage(manifest,p)});
  assert.ok(props.srcSet.includes('/prepared-images/'));
  assert.ok(!props.srcSet.includes('/_next/image'));
  assert.equal(props.loading,'lazy');
});
test('all generated manifest files exist at the recorded sizes', async () => {
  const manifest = JSON.parse(await fs.readFile('src/generated/image-manifest.json','utf8'));
  assert.ok(Object.keys(manifest).length > 300);
  for (const variants of Object.values(manifest)) for (const item of variants) {
    if (item.src.startsWith('/prepared-images/')) assert.equal((await fs.stat('public'+item.src)).size,item.bytes);
  }
});

test('an unreadable legacy asset does not prevent other images from preparing', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'image-fallback-'));
  try {
    await fs.mkdir(path.join(root, 'public'));
    await fs.writeFile(path.join(root, 'public/bad.avif'), 'invalid image');
    await fs.writeFile(path.join(root, 'public/icon.png'), await sharp({create:{width:20,height:20,channels:3,background:'#fff'}}).png().toBuffer());
    const report = await prepareAll(root, true);
    assert.equal(report.images.length, 1);
    assert.equal(report.warnings.length, 1);
    assert.match(report.warnings[0], /bad.avif/);
    assert.equal(await fs.readFile(path.join(root, 'public/bad.avif'), 'utf8'), 'invalid image');
  } finally { await fs.rm(root, {recursive:true,force:true}); }
});
