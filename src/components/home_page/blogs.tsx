import Hero from "@/components/blogs_page/hero";
import Blogs from "@/components/blogs_page/blogs";
import dataEn from "@/data/english_data/home_page.json";
import dataAr from "@/data/arabic_data/home_page.json";
import dataZh from "@/data/chinese_data/home_page.json";
import dataFr from "@/data/french_data/home_page.json";
import dataDe from "@/data/german_data/home_page.json";
import dataEs from "@/data/spanish_data/home_page.json";
import dataUr from "@/data/urdu_data/home_page.json";
import { getCachedLanguage } from "@/lib/language";

export default async function BlogsPage() {
  const lang = await getCachedLanguage();
  const homeDataByLang: Record<string, typeof dataEn> = {
    en: dataEn,
    ar: dataAr,
    zh: dataZh,
    fr: dataFr,
    de: dataDe,
    es: dataEs,
    ur: dataUr,
  };

  const activeHomeData = homeDataByLang[lang] ?? dataEn;

  return (
    <section className="py-20 px-6 md:px-8 bg-background lg:px-20">
      <Hero data={activeHomeData.blog_section} />
      <Blogs limit={6} />
    </section>
  );
}
