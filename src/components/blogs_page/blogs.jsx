// app/blogs/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import { ArrowRight } from "lucide-react";
import { CategoryNav } from './navber' // Import the client nav

export default async function BlogListPage() {
  const payload = await getPayload({ config })

  const { docs: blogs } = await payload.find({
    collection: 'blogs',
    depth: 1, 
  })

  return (

      
<div className="flex flex-wrap justify-start gap-3 mb-12">
       

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {blogs.map((blog) => (
            <div  key={blog.id} className="group cursor-pointer flex flex-col h-full">
            
             {blog.coverImage && typeof blog.coverImage === 'object' && (
              <div className="rounded-2xl overflow-hidden mb-6 h-64 md:h-72 w-full">
                <img
                  src={blog.coverImage.url || ''} 
                  alt={blog.coverImage.alt || blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}

              <div className="flex flex-col flex-grow items-start">
                
                <div className=" flex flex-col gap-2 items-start  mb-3">
                  <span className="bg-[#EAD5F9] dark:bg-[#47295C] text-[#402060] dark:text-white text-[10px] md:text-xs font-bold px-3 py-3 rounded-full uppercase tracking-wide">
                   {blog.category}
                  </span>
                  <p className="text-[#8E4EC6] text-xs font-medium">
                    • Devison Tech Blog • {new Date(blog.date).toLocaleDateString()}
                  </p>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-t-primary dark:text-t-secondary mb-4 leading-snug ">
                  {blog.title}
                </h3>

                <div className="mt-auto flex items-center text-t-primary  text-sm font-bold ">
 <a href={`/blogs/${blog.slug}`} >
                Read More
              </a>                  <ArrowRight className="w-4 h-4 ml-2 transition-transform hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
  )
}



        
