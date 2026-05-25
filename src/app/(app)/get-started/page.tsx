import type { Metadata } from "next";
import GetStartedClient from "@/components/get_started/get_started_client";
import { GET_STARTED_PAGE_METADATA } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = GET_STARTED_PAGE_METADATA;

export default function GetStartedPage() {
  return <GetStartedClient />;
}
