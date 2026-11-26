import databaseGuide from "@/data/english_data/database-guide.json";
import proposalGuide from "@/data/english_data/proposal-guide.json";
import psychGuide from "@/data/english_data/psych-guide.json";
import grainGuide from "@/data/english_data/grain-guide.json";
import hotelGuide from "@/data/english_data/hotel-guide.json";
import analyticsGuide from "@/data/english_data/analytics-guide.json";
import demandGuide from "@/data/english_data/demand-guide.json";
import discoveryGuide from "@/data/english_data/discovery-guide.json";
import lowCodeGuide from "@/data/english_data/low-code-guide.json";
import wireframingGuide from "@/data/english_data/wireframing-guide.json";
import hvacGuide from "@/data/english_data/hvac-software-guide.json";
import prototypeServices from "@/data/english_data/wireframing-and-prototyping-services.json";
import manualTesting from "@/data/english_data/manual-software-testing-services.json";
import mobileBackend from "@/data/english_data/mobile-app-backend-development-services.json";
import computerVision from "@/data/english_data/custom-computer-vision-development-services.json";
import { getPayload } from "payload";
import config from "@payload-config";
import { CategoryNav } from "./blogs_ui";
import { unstable_cache } from "next/cache";
import { getCachedLanguage } from "@/lib/language";
import { translateTextForLanguage } from "@/lib/blog-language";

export type Blog = {
  id?: string | number;
  title: string;
  slug: string;
  category: string;
  author?: string;
  content: unknown;
  coverImage?: { url: string; alt?: string; updatedAt?: string };
  date: string;
  status: string;
  language?: string;
};

interface BlogListPageProps {
  limit?: number;
}

const getPublishedBlogs = unstable_cache(
  async (_lang: string, limit?: number) => {
    const payload = await getPayload({ config });
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const result = (await (payload as any).find({
      collection: "blogs",
      depth: 1,
      limit,
      sort: "-date",
      where: {
        status: { equals: "published" },
      },
    })) as { docs: Blog[] };

    return result.docs;
  },
  ["published-blogs"],
  { revalidate: 300 },
);

export default async function BlogListPage({ limit }: BlogListPageProps = {}) {
  const lang = await getCachedLanguage();
  const cmsBlogs = await getPublishedBlogs(lang, limit);
  const guides = [databaseGuide, proposalGuide, psychGuide, grainGuide, hotelGuide, analyticsGuide, demandGuide, discoveryGuide, lowCodeGuide, wireframingGuide, hvacGuide];
  guides.push(prototypeServices, manualTesting, mobileBackend, computerVision);
  const guideSlugs = new Set(guides.map((guide) => guide.slug));
  const blogs = [...guides, ...cmsBlogs.filter((blog) => !guideSlugs.has(blog.slug))]
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, limit || undefined);
  const translatedBlogs = await Promise.all(
    blogs.map(async (blog) => ({
      ...blog,
      title: await translateTextForLanguage(blog.title, lang),
      category: await translateTextForLanguage(blog.category, lang),
      author: await translateTextForLanguage(blog.author || "", lang),
    })),
  );

  const categories = [
    "All",
    ...Array.from(new Set(translatedBlogs.map((b: Blog) => b.category))),
  ];

  return <CategoryNav key={lang} blogs={translatedBlogs} categories={categories} lang={lang} />;
}
