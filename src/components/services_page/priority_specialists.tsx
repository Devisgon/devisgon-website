import Link from "next/link";
import { ArrowUpRight, Phone, FileText, Headset } from "lucide-react";
const services = [
  { title: "Voice agents", href: "/services/voice-agent-development-services", description: "Call handling, qualification and human handoff.", icon: Phone },
  { title: "Invoice automation", href: "/services/invoice-automation-services", description: "Invoice intake, extraction, review and accounting integrations.", icon: FileText },
  { title: "AI receptionist", href: "/services/ai-receptionist-services", description: "First responses, appointment intake and enquiry routing.", icon: Headset },
];
export default function PrioritySpecialists() {
  return <section className="mx-auto max-w-7xl px-6 py-14"><p className="text-xs font-semibold uppercase tracking-widest text-[#A71A7F]">AI & automation solutions</p><h2 className="mb-8 mt-3 text-3xl font-medium tracking-tight text-t-primary">Start with a practical business workflow.</h2><div className="grid gap-5 md:grid-cols-3">{services.map(({ title, href, description, icon: Icon }) => <Link key={href} href={href} className="rounded-xl border border-[#A71A7F]/20 bg-bg-primary p-6 transition-colors hover:border-[#A71A7F]"><Icon size={25} className="mb-5 text-[#A71A7F]" /><h3 className="flex items-center justify-between text-xl font-medium text-t-primary">{title}<ArrowUpRight size={17} /></h3><p className="mt-3 text-sm leading-7 text-t-secondary">{description}</p></Link>)}</div></section>;
}
