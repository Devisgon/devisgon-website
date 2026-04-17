import { getPayload } from "payload";
import config from "@payload-config";
import { CategoryNav } from "./blogs_ui";
import { unstable_cache } from "next/cache";
import { getCachedLanguage } from "@/lib/language";

export type Blog = {
  title: string;
  slug: string;
  category: string;
  content: unknown;
  coverImage?: { url: string; alt?: string };
  date: string;
  status: string;
  locale?: string;
};

interface BlogListPageProps {
  limit?: number;
}

const getPublishedBlogs = unstable_cache(
  async (lang: string, limit?: number) => {
    const payload = await getPayload({ config });

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const { docs: blogs } = (await (payload as any).find({
      collection: "blogs",
      depth: 1,
      limit,
      sort: "-date",
      locale: lang,
      where: { status: { equals: "published" } },
    })) as { docs: Blog[] };

    return blogs;
  },
  ["published-blogs"],
  { revalidate: 300 },
);

export default async function BlogListPage({ limit }: BlogListPageProps = {}) {
  const lang = await getCachedLanguage();
  const blogs = await getPublishedBlogs(lang, limit);

  const categories = [
    "All",
    ...Array.from(new Set(blogs.map((b: Blog) => b.category))),
  ];

  return <CategoryNav blogs={blogs} categories={categories} lang={lang} />;
}
