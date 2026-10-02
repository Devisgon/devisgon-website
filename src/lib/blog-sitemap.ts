type SitemapPost = { slug?: string | null; status?: string | null; updatedAt?: string | null };

export function buildBlogSitemap(posts: SitemapPost[], siteUrl: string): string {
  const escapeXml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  const seen = new Set<string>();
  const entries = [`<url><loc>${escapeXml(siteUrl)}/blogs</loc></url>`];
  for (const post of posts) {
    if (post.status !== "published" || !post.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug) || seen.has(post.slug)) continue;
    seen.add(post.slug);
    const updated = post.updatedAt ? new Date(post.updatedAt) : null;
    const lastmod = updated && !Number.isNaN(updated.getTime()) ? `<lastmod>${updated.toISOString()}</lastmod>` : "";
    entries.push(`<url><loc>${escapeXml(siteUrl)}/blogs/${post.slug}</loc>${lastmod}</url>`);
  }
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}</urlset>`;
}
