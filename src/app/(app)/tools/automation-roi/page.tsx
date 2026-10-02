import Link from "next/link";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import AutomationRoi from "@/components/automation_roi";
import { getJsonSeoMetadata, HOME_PAGE_METADATA } from "@/lib/seo";
import { getCachedLanguage } from "@/lib/language";
import { localizeContentTree } from "@/lib/content-language";
import LocalizedText from "@/components/localized_text";

export async function generateMetadata() {
  const lang = await getCachedLanguage();
  const seo = await localizeContentTree({ title: "Automation Value Calculator | Devisgon", description: "Estimate hours potentially freed, recurring costs and implementation payback from your own business automation assumptions." }, lang);
  return getJsonSeoMetadata(seo, HOME_PAGE_METADATA, "/tools/automation-roi");
}
export default async function AutomationRoiPage() {
  const lang = await getCachedLanguage();
  return <><Header /><LocalizedText lang={lang}><section className="mx-auto max-w-5xl px-6 py-24 text-t-primary"><h1 className="text-4xl font-bold">Estimate the value of an automation</h1><p className="mt-5 text-t-secondary">Start with your current task volume and hands-on time. Change the assumptions to account for automation coverage, staff review and recurring costs. The sample values are illustrative and run in your browser.</p><AutomationRoi lang={lang} /><section className="mt-10"><h2 className="text-2xl font-semibold">How the estimate works</h2><p className="mt-4 text-t-secondary">Hours freed = tasks × automation coverage × (current minutes − review minutes) ÷ 60, with a minimum of zero. Multiply hours by the value of staff time, then subtract recurring costs. Simple payback = implementation cost ÷ positive monthly value after recurring costs.</p><div className="mt-5 flex flex-wrap gap-5"><Link href="/resources/automation-discovery-checklist" className="underline">Plan the workflow</Link><Link href="/contact" className="underline">Discuss an automation project</Link></div></section></section></LocalizedText><Footer /></>;
}
