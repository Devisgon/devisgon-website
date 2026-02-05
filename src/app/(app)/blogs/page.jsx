import Header from "@/components/navbar"
import Hero from "@/components/blogs_page/hero"
import Blogs from "@/components/blogs_page/blogs"
import Footer from "@/components/footer"
import data from "@/data/home_page.json"
export default async function BlogsPage() {
return (
  <>
  <Header/>
  <section className="py-20 px-6 md:px-8 bg-background lg:px-20">
  <Hero data={data.blog_section}/>
  <Blogs/>
  </section>
   <Footer/>
</>
  )
}
