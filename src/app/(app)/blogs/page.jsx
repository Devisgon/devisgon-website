import Hero from "@/components/blogs_page/hero"
import Blogs from "@/components/blogs_page/blogs"
import data from "@/data/english_data/home_page.json"
import Footer from '@/components/footer';
import Header from '@/components/navbar';
import { BLOGS_PAGE_METADATA } from "@/lib/seo";

export const metadata = BLOGS_PAGE_METADATA;

export default async function BlogsPage() {
return (
  <>
  <Header />
  <section className="py-20 px-6 md:px-8 bg-background lg:px-20">
  <Hero data={data.blog_section}/>
  <Blogs />
  </section>
  <Footer />
</>
  )
}
