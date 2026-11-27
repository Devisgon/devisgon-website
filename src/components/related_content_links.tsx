import Link from "next/link";
import { localizeContentTree } from "@/lib/content-language";
import { relatedContent } from "@/lib/related-content";

export default async function RelatedContentLinks({ path, lang, articleText }: {
  path: string;
  lang: string;
  articleText?: string;
}) {
  const { heading, links } = await localizeContentTree({
    heading: "Related reading and services",
    links: relatedContent(path, articleText),
  }, lang);
  return (
    <nav aria-label={heading} className="my-5 text-t-primary">
      <p className="mb-2 font-semibold">{heading}</p>
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="underline underline-offset-4 hover:text-t-secondary">{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
