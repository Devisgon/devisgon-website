import { getPayload } from "payload";
import config from "@payload-config";
import { CategoryNav } from "./blogs_ui";
export default async function BlogListPage() {
  const payload = await getPayload({ config });

  const { docs: blogs } = await payload.find({
    collection: "blogs",
    depth: 1,
  });

  const categories = [
    "All",
    ...new Set(blogs.map((b) => b.category)),
  ];

  return (
    <CategoryNav blogs={blogs} categories={categories} />
  );
}
