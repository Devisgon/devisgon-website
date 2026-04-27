import type { Metadata } from "next";
import ContactPageClient from "@/components/contact_page/contact_page_client";
import { CONTACT_PAGE_METADATA } from "@/lib/seo";
import { getCachedLanguage } from "@/lib/language";
import { getContactPageDataByLang } from "@/lib/localized-content";

export const metadata: Metadata = CONTACT_PAGE_METADATA;

export default async function ContactPage() {
  const lang = await getCachedLanguage();
  const content = getContactPageDataByLang(lang);
  return <ContactPageClient content={content} />;
}
