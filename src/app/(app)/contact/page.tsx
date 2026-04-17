import type { Metadata } from "next";
import ContactPageClient from "@/components/contact_page/contact_page_client";
import { CONTACT_PAGE_METADATA } from "@/lib/seo";

export const metadata: Metadata = CONTACT_PAGE_METADATA;

export default function ContactPage() {
  return <ContactPageClient />;
}
