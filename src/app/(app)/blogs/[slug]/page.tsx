import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

import CustomRichText from "@/components/payload_rich_text_styling";

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
    depth: 1,
  })

  const blog = result.docs[0]
  if (!blog) return notFound()

  return (
    <main className="max-w-6xl mx-auto mt-12 py-16 px-6 font-sans">
      <header className="mb-12 border-b border-gray-100 pb-8">
        <h1 className="text-5xl md:text-6xl font-bold  text-t-primary dark:text-t-secondary mb-6">
          {blog.title}
        </h1>
        <div className="flex items-center gap-2 text-sm font-bold text-t-primary uppercase ">
          <span >By Devison Team</span>
          <span className="text-[#8E4EC6]">•</span>
          <span>{new Date(blog.date).toLocaleDateString()}</span>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12 mb-20">
        
        <div className="flex-1">
          <div className="prose prose-lg text-t-secondary max-w-none">
<CustomRichText content={blog.content} />
</div>

        </div>

             {blog.coverImage && typeof blog.coverImage === 'object' && (
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden  ">
              <img
                  src={blog.coverImage.url } 
                  alt={blog.coverImage.alt }
                  className='w-full h-full'
              />
            </div>
          </div>
        )}
      </div>

      
    </main>
  )
}