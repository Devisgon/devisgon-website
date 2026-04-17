import type { Metadata } from "next";
import Page from "@/components/home_page/main_page"
import Blogs from "@/components/home_page/blogs"
import Footer from '@/components/footer';
import Header from '@/components/navbar';
import { Suspense } from "react";
import { HOME_PAGE_METADATA } from "@/lib/seo";

export const metadata: Metadata = HOME_PAGE_METADATA;

export default function Home() {


  return (
    <main>
                <Header /> 

          <Page/>
         <Suspense fallback={<section className="py-8" />}>
           <Blogs/>
         </Suspense>
                             <Footer /> 


    </main>
  );
}
