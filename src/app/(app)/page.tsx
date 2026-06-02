import type { Metadata } from "next";
import Page from "@/components/home_page/main_page"
import Blogs from "@/components/home_page/blogs"
import Footer from '@/components/footer';
import Header from '@/components/navbar';
import InternalLinks, { CORE_INTERNAL_LINKS } from "@/components/shared/internal_links";
import { Suspense } from "react";
import { HOME_PAGE_METADATA, getHomePageStructuredData } from "@/lib/seo";

export const metadata: Metadata = HOME_PAGE_METADATA;
const homePageStructuredData = getHomePageStructuredData();

export default function Home() {


  return (
    <main>
                <Header /> 
          <script
            id="home-page-structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageStructuredData) }}
          />

          <Page/>
         <Suspense fallback={<section className="py-8" />}>
           <Blogs/>
         </Suspense>
         <InternalLinks
           title="Explore Devisgon Services, Industries, and Technologies"
           description="Use these pages to move from the homepage into our services, industry solutions, technology stack, delivery process, blog, and contact flow."
           links={CORE_INTERNAL_LINKS}
         />
                             <Footer /> 


    </main>
  );
}
