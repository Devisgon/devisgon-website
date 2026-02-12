export async function getHomePageData(lang: string) {
  try {
    // This dynamically imports the correct JSON file based on the language code
    const data = await import(`@/data/${lang}_data/home_page.json`);
    return data.default;
  } catch (error) {
    // Fallback to English if the language file doesn't exist
    const fallback = await import(`@/data/english_data/home_page.json`);
    return fallback.default;
  }
}