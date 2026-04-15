import fs from 'fs';
import path from 'path';
import translate from 'translate';

translate.engine = 'google';

const dataPath = path.join(process.cwd(), 'src', 'data');
const englishDir = path.join(dataPath, 'english_data', 'services');

const directoriesToTranslate = ['testing', 'digital_design', 'cloud'];
      
const targetLanguages = [
  { folder: 'arabic_data', code: 'ar' },
  { folder: 'chinese_data', code: 'zh-cn' },
  { folder: 'french_data', code: 'fr' },
  { folder: 'german_data', code: 'de' },
  { folder: 'spanish_data', code: 'es' },
  { folder: 'urdu_data', code: 'ur' }
];

const excludeKeys = new Set([
  'slug',
  'icon_type', 
  'icon', 
  'link', 
  'hero_image', 
  'side_image', 
  'image', 
  'link_url', 
  'url'
]);

// Wait function to avoid rate limits
const delay = ms => new Promise(res => setTimeout(res, ms));

async function translateObject(obj, targetLang) {
  if (typeof obj === 'string') {
    // Only translate if there are actual words and it's not a path
    if (obj.startsWith('/') || obj.trim().length === 0) {
      return obj;
    }
    try {
      return await translate(obj, { from: 'en', to: targetLang });
    } catch (err) {
      console.error(`Error translating text: "${obj.substring(0, 20)}..."`, err.message);
      return obj; // fallback to english
    }
  } else if (Array.isArray(obj)) {
    const newArr = [];
    for (const item of obj) {
      newArr.push(await translateObject(item, targetLang));
    }
    return newArr;
  } else if (obj !== null && typeof obj === 'object') {
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
      if (excludeKeys.has(key)) {
        newObj[key] = value;
      } else {
        newObj[key] = await translateObject(value, targetLang);
      }
    }
    return newObj;
  }
  return obj;
}

async function run() {
  console.log('Starting translation...');
  for (const dir of directoriesToTranslate) {
    const sourceDirPath = path.join(englishDir, dir);
    if (!fs.existsSync(sourceDirPath)) {
      console.log(`Source directory not found: ${sourceDirPath}`);
      continue;
    }

    const files = fs.readdirSync(sourceDirPath).filter(f => f.endsWith('.json'));

    for (const file of files) {
      const sourceFilePath = path.join(sourceDirPath, file);
      const englishJson = JSON.parse(fs.readFileSync(sourceFilePath, 'utf8'));

      console.log(`\nProcessing file: ${dir}/${file}...`);

      for (const lang of targetLanguages) {
        const targetDirPath = path.join(dataPath, lang.folder, 'services', dir);
        if (!fs.existsSync(targetDirPath)) {
          fs.mkdirSync(targetDirPath, { recursive: true });
        }

        const targetFilePath = path.join(targetDirPath, file);

        console.log(` -> Translating to ${lang.code} (${lang.folder})`);
        
        try {
          const translatedJson = await translateObject(englishJson, lang.code);
          fs.writeFileSync(targetFilePath, JSON.stringify(translatedJson, null, 2), 'utf8');
        } catch (error) {
          console.error(`Failed to process ${lang.folder}/${file}: ${error.message}`);
        }
        
        // Short delay to respect API limits
        await delay(500);
      }
    }
  }
  console.log('\n✅ Translation script finished successfully.');
}

run();
