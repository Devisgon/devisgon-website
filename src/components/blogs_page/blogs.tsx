import { getPayload } from "payload";
import config from "@payload-config";
import { CategoryNav } from "./blogs_ui";
import { cookies } from "next/headers";

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

export default async function BlogListPage({ limit }: BlogListPageProps = {}) {
  const payload = await getPayload({ config });

  // 🔥 Read language from cookie
const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "en";

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { docs: blogs } = await (payload as any).find({
    collection: "blogs",
    depth: 1,
    limit,
    sort: "-date",
    locale: lang,
    where: { status: { equals: "published" } },
  }) as { docs: Blog[] };

  const categories = [
    "All",
    ...Array.from(new Set(blogs.map((b: Blog) => b.category))),
  ];

  return (
    <CategoryNav blogs={blogs} categories={categories} lang={lang} />
  );
}