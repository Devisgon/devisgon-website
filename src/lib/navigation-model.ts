export type NavigationItem = {
  name: string;
  href: string;
  dropdown?: { columns: { title?: string; links: NavigationItem[] }[] };
};
export type NavigationGroup = { title: string; links: NavigationItem[] };

export function flattenNavigation(items: NavigationItem[]): NavigationItem[] {
  return items.flatMap((item) => [item, ...flattenNavigation(item.dropdown?.columns.flatMap((column) => column.links) ?? [])]);
}

export function buildNavigation(items: NavigationItem[]) {
  const flat = flattenNavigation(items);
  const find = (href: string) => flat.find((item) => item.href === href);
  const serviceColumns = find("/services")?.dropdown?.columns ?? [];
  const ai: NavigationItem[] = [];
  const products: NavigationItem[] = [];
  const supporting: NavigationItem[] = [];
  for (const column of serviceColumns) {
    const links = flattenNavigation(column.links);
    const target = links.some((link) => /\/(ai-agent-development-automation-services|business-process-automation-services)$/.test(link.href)) ? ai
      : links.some((link) => link.href.endsWith("/ai-software-development-automation-services")) ? products : supporting;
    for (const link of links) (link.href.includes("/seo-") ? supporting : target).push(link);
  }
  const catalogs = [
    { id: "services", name: find("/services")?.name ?? "Services", href: "/services", groups: [
      { title: "AI & automation", links: ai },
      { title: "AI products & development", links: products },
      { title: "Supporting services", links: supporting },
    ].filter((group) => group.links.length) },
    ...["industries", "technologies"].map((id) => ({
      id, name: find(`/${id}`)?.name ?? id, href: `/${id}`,
      groups: (find(`/${id}`)?.dropdown?.columns ?? []).map((column) => ({ title: column.title ?? "Explore", links: flattenNavigation(column.links) })),
    })),
  ];
  const catalogHrefs = new Set(catalogs.flatMap((catalog) => [catalog.href, ...catalog.groups.flatMap((group) => group.links.map((link) => link.href))]));
  const resources = flat.filter((item) => item.href === "/resources" || item.href === "/blogs");
  const resourceHrefs = new Set(resources.map((item) => item.href));
  const company = flat.filter((item) => !catalogHrefs.has(item.href) && !resourceHrefs.has(item.href) && !["/", "/our-process"].includes(item.href));
  // Deduplicate destinations, preserving the first localized label. Unknown
  // future destinations remain reachable in Company rather than disappearing.
  const unique = (links: NavigationItem[]) => links.filter((link, index) => links.findIndex((other) => other.href === link.href) === index);
  return { catalogs, resources: unique(resources), company: unique(company) };
}
