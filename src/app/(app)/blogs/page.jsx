import Hero from "@/components/blogs_page/hero"
import Blogs from "@/components/blogs_page/main_blog_page/blogs"
import data from "@/data/home_page.json"
export default async function BlogsPage() {
return (
  <>
  <section className="py-20 px-6 md:px-8 bg-background lg:px-20">
  <Hero data={data.blog_section}/>
  <Blogs/>
  </section>
</>
  )
}
