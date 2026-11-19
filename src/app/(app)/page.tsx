import type { Metadata } from "next";
import Page from "@/components/home_page/main_page";
import Blogs from "@/components/home_page/blogs";
import Footer from "@/components/footer";
import Header from "@/components/navbar";
import { HOME_PAGE_METADATA, getHomePageStructuredData } from "@/lib/seo";

export const metadata: Metadata = HOME_PAGE_METADATA;
const homePageStructuredData = getHomePageStructuredData();

export default function Home() {
  return (
    <div>
      <Header />
      <script
        id="home-page-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageStructuredData) }}
      />
      <Page><Blogs /></Page>
      <Footer />
    </div>
  );
}
