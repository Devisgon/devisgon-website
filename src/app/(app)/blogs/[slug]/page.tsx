import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CustomRichText from "@/components/payload_rich_text_styling";
import Footer from '@/components/footer';
import Header from '@/components/navbar';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config })

  // 1. Fetch the current blog post
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await (payload as any).find({
    collection: 'blogs',
    where: { slug: { equals: slug } },
    depth: 1,
  })

  const blog = result.docs[0]
  if (!blog) return notFound()

  // 2. Fetch recent blog posts for the sidebar
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recentPostsResult = await (payload as any).find({
    collection: 'blogs',
    where: { slug: { not_equals: slug } },
    sort: '-createdAt', 
    limit: 4,
    depth: 1,
  })
  
  const recentPosts = recentPostsResult.docs

  return (
    <>
      <Header />
      
      {/* Header Section */}
      <div className="w-full bg-background pt-16 pb-12 px-6">
        <header className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center border-b border-gray-200 dark:border-gray-800 pb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-t-primary my-12 leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center gap-2 text-sm md:text-base font-bold text-[#402060] dark:text-[#E2C6F8] uppercase tracking-wider">
            <span>BY {blog.author || "DEVISGON TECH BLOG"}</span>
            <span className="text-[#8E4EC6]">•</span>
            <span>{new Date(blog.date || blog.createdAt).toLocaleDateString('en-US')}</span>
          </div>
        </header>
      </div>

      <main className="max-w-7xl mx-auto py-12 px-6 font-sans">
        
        {/* Main 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-12">
          
          {/* LEFT COLUMN: Main Blog Content */}
          <article className="lg:col-span-2">
            
            {/* Cover Image */}
            {blog.coverImage && typeof blog.coverImage === 'object' && (
              <div className="w-full mb-10 rounded-xl overflow-hidden shadow-sm">
                <img
                  src={blog.coverImage.url}
                  alt={blog.coverImage.alt || blog.title}
                  className="w-full object-cover max-h-[300px]"
                />
              </div>
            )}

            {/* Rich Text Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <CustomRichText content={blog.content} />
            </div>

            {/* Back Button */}
            <Link 
              href="/blogs" 
              className="inline-block p-4 bg-[#402060] hover:-translate-y-2 hover:scale-105 duration-300 dark:bg-[#6F1595] text-white rounded-xl font-medium" 
            >
              Back to Blogs
            </Link>
          </article>


          {/* RIGHT COLUMN: Sidebar (Newsletter & Recent Posts Cards) */}
          {/* Added lg:border-l and lg:pl-12 to create the dividing line */}
          <aside className="lg:col-span-1 flex flex-col gap-12 pt-4 lg:border-l lg:border-gray-200 dark:lg:border-gray-800 lg:pl-12">
            
            {/* Newsletter Section */}
            <div className="bg-[#faf8fc] border border-purple-100 dark:border-gray-800 dark:bg-gray-900/50 p-8 rounded-xl shadow-sm">
              <h3 className="text-[#402060] dark:text-[#E2C6F8] font-bold text-xl mb-4 leading-snug">
                Join Our Community:<br/>
                Sign Up for Exclusive<br/>
                Newsletter
              </h3>
              <form className="flex flex-col gap-4">
                <input 
                  type="email" 
                  placeholder="Enter Email" 
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 outline-none focus:border-[#d966ff] dark:text-white text-sm"
                  required
                />
                <button 
                  type="submit" 
                  className="w-full md:w-auto self-start bg-[#d966ff] hover:bg-[#c952f2] text-white font-bold py-3 px-8 rounded-md transition duration-300 text-sm tracking-wider uppercase"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Recent Posts Section */}
            <div>
              <h3 className="text-2xl font-bold text-[#402060] dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
                Recent Posts
              </h3>
              <div className="flex flex-col gap-8">
                {recentPosts.map((post: any) => (
                  <Link href={`/blogs/${post.slug}`} key={post.id} className="flex flex-col group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800">
                    
                    {/* Card Image */}
                    {post.coverImage && typeof post.coverImage === 'object' ? (
                      <div className="w-full h-48 overflow-hidden relative">
                        <img 
                          src={post.coverImage.url} 
                          alt={post.coverImage.alt || post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-gray-200 dark:bg-gray-800"></div>
                    )}
                    
                    {/* Card Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="text-lg font-bold text-[#402060] dark:text-gray-200 group-hover:text-[#d966ff] dark:group-hover:text-[#e066ff] transition duration-300 line-clamp-2 mb-4">
                        {post.title}
                      </h4>
                      
                      {/* Author & Date Footer */}
                      <div className="mt-auto flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        <span className="truncate max-w-[60%]">{post.author || "Admin"}</span>
                        <span>{new Date(post.date || post.createdAt).toLocaleDateString('en-US')}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </main>
      
      <Footer />
    </> 
  )
}