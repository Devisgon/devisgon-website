import Hero from "@/components/blogs_page/hero"
import Blogs from "@/components/blogs_page/blogs"
import data from "@/data/english_data/home_page.json"

export default function BlogsPage() {
  return (
    <section className="py-20 px-6 md:px-8 bg-background lg:px-20">
      <Hero data={data.blog_section}/>
      <Blogs limit={6}/>
    </section>
  )
}
