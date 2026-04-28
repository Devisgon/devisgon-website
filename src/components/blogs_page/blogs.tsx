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
  coverImage?: { url: string; alt?: string };
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
  const blogs = await getPublishedBlogs(lang, limit);
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
