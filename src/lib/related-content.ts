import { articleTopics } from "@/data/article-topics";
import navigation from "@/data/navbar.json";

const catalog = navigation.navbar.flatMap((section) =>
  section.dropdown?.columns?.flatMap((column) => column.links ?? []) ?? [],
);
const labels = new Map(catalog.map((link) => [link.href, link.name] as const));

export function relatedContent(path: string, articleText = "") {
  const words = " " + articleText.toLowerCase().replace(/[^a-z0-9]+/g, " ") + " ";
  const topics = path.startsWith("/blogs/")
    ? articleTopics.filter((topic) => topic.keywords.some((keyword) =>
        words.includes(" " + keyword.replace(/-/g, " ") + " "),
      ))
    : articleTopics.filter((topic) => topic.pages.includes(path));

  const links = new Map<string, string>();
  for (const topic of topics) {
    const position = topic.pages.indexOf(path);
    const following = [...topic.pages.slice(position + 1), ...topic.pages.slice(0, Math.max(position, 0))];
    for (const prefix of ["/services/", "/industries/"]) {
      const href = following.find((item) => item.startsWith(prefix) && item !== path);
      const label = href && labels.get(href);
      if (href && label) links.set(href, label);
    }
    links.set("/blog/" + topic.slug, topic.title);
  }
  if (!links.size) {
    links.set("/services", "Explore services");
    links.set("/industries", "Browse industry solutions");
  }
  return Array.from(links, ([href, label]) => ({ href, label })).slice(0, 4);
}
