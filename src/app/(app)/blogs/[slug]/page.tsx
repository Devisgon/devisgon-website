import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import CustomRichText from "@/components/payload_rich_text_styling";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await (payload as any).find({
    collection: 'blogs',
    where: { slug: { equals: slug } },
    depth: 1,
  })

  const blog = result.docs[0]
  if (!blog) return notFound()

  return (
    <main className="max-w-6xl mx-auto mt-12 py-16 items-center flex flex-col px-6 font-sans">
      <header className="md:mb-12  order-b flex items-center flex-col border-gray-100 pb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-t-primary dark:text-t-secondary mb-6">
          {blog.title}
        </h1>
        <div className="flex items-center gap-2  text-sm font-bold text-t-primary uppercase ">
          <span > by {blog.author}</span>
          <span className="text-[#8E4EC6]">•</span>
          <span>{new Date(blog.date).toLocaleDateString()}</span>
        </div>
      </header>

      <div className="flex flex-col-reverse lg:flex-row items-center md:items-start -mt-56 md:mt-0 gap-4 md:gap-12 lg:gap-12 md:mb-20">
        
        <div className="flex-1 -mt-24 px-8 md:mt-0">
             <CustomRichText content={blog.content} />

        </div>

             {blog.coverImage && typeof blog.coverImage === 'object' && (
            <div className="relative w-96 h-[600px]   ">
              <img
                  src={blog.coverImage.url } 
                  alt={blog.coverImage.alt }
                  className='w-full h-full   object-contain mt-12 px-6 md:px-0 md:object-cover object-center '
              />
            </div>
        )}
      </div>

      <Link href="/blogs" className="p-4 bg-[#402060] hover:-translate-y-4 -ml-2 md:-ml-12 hover:scale-110 duration-500 dark:bg-[#6F1595] text-white rounded-xl " >
          Back to Blogs
        </Link>
    </main>
  )
}