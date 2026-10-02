import Link from "next/link";

export type BuyerGuideData = { title: string; fit: string; inputs: string[]; deliverables: string[]; acceptance: string[]; resource: string };

export default function BuyerGuide({ data }: { data?: BuyerGuideData }) {
  if (!data) return null;
  return <section className="bg-bg-secondary px-6 py-16 text-t-primary">
    <div className="mx-auto max-w-6xl">
      <h2 className="text-3xl font-bold">{data.title}</h2><p className="mt-4 max-w-3xl text-t-secondary">{data.fit}</p>
      <div className="mt-8 grid gap-8 md:grid-cols-3">{[
        { title: "What we need to scope the work", items: data.inputs },
        { title: "What your project can include", items: data.deliverables },
        { title: "What we agree before launch", items: data.acceptance },
      ].map((group) => <div key={group.title}><h3 className="text-lg font-semibold">{group.title}</h3><ul className="mt-3 list-disc space-y-3 pl-5 text-t-secondary">{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div>
      <p className="mt-8 text-t-secondary">Price and timing depend on scope, integrations, data readiness and review requirements. We agree milestones and ownership before development.</p>
      <div className="mt-5 flex flex-wrap gap-5"><Link className="underline" href={data.resource}>Use the planning checklist</Link><Link className="underline" href="/contact">Discuss scope and fit</Link></div>
    </div>
  </section>;
}
