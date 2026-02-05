import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import AuthorSlug from '@/components/blogs_page/blogs'

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await (payload as any).find({
    collection: 'blogs',
    where: { slug: { equals: slug } },
    depth: 2,
  })

  const blog = result.docs[0]
  if (!blog) return notFound()

  return (
    <main className="max-w-6xl mx-auto py-16 px-6 font-sans">
      {/* --- TOP HEADER SECTION --- */}
      <header className="mb-12 border-b border-gray-100 pb-8">
        <h1 className="text-5xl md:text-6xl font-bold  text-[#402060] dark:text-[#8E4EC6]  mb-6">
          {blog.title}
        </h1>
        <div className="flex items-center gap-2 text-sm font-bold text-t-primary uppercase ">
          <span >By Devison Team</span>
          <span className="text-[#8E4EC6]">•</span>
          <span>{new Date(blog.date).toLocaleDateString()}</span>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12 mb-20">
        
        {/* Left Column: Rich Text Content */}
        <div className="flex-1">
          <div className="text-t-primary">
            {blog.content ? (
              <PayloadRichText data={blog.content} />
            ) : (
              <p>No content available.</p>
            )}
          </div>
        </div>

             {blog.coverImage && typeof blog.coverImage === 'object' && (
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-sm shadow-sm border border-gray-100">
              <Image
                  src={blog.coverImage.url || ''} 
                  alt={blog.coverImage.alt || blog.title}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                priority
              />
            </div>
          </div>
        )}
      </div>

      
    </main>
  )
}