import { getPayload } from "payload";
import config from "@payload-config";
import { buildBlogSitemap } from "@/lib/blog-sitemap";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await getPayload({ config });
    const posts: Array<{ slug: string; status: string; updatedAt: string }> = [];
    let page = 1;
    while (true) {
      const result = await payload.find({
        collection: "blogs", where: { status: { equals: "published" } },
        depth: 0, limit: 500, page, overrideAccess: false,
        select: { slug: true, status: true, updatedAt: true }, sort: "id",
      });
      posts.push(...result.docs);
      if (!result.hasNextPage) break;
      page += 1;
    }
    return new Response(buildBlogSitemap(posts, SITE_URL), {
      headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch {
    // A CMS outage must not be cached as a valid empty sitemap.
    return new Response("Sitemap temporarily unavailable", { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
