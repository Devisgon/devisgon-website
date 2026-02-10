"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
export function CategoryNav({ blogs, categories }: any) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter((b: any) => b.category === activeCategory);

  return (
    <div >
     
 <div className="flex flex-wrap justify-start gap-3 mb-12">
        {categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-6 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-300
                ${
                  activeCategory === cat
                    ? " bg-[#EAD5F9] dark:bg-[#47295C] text-t-primary" 
                    : "bg-transparent text-t-secondary hover:bg-[#EAD5F9] dark:hover:bg-[#47295C]" 
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>


       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {filteredBlogs.map((blog: any) => (
            <div key={blog.id} className="group cursor-pointer flex flex-col h-full">
              
              <div className="rounded-2xl overflow-hidden mb-6 h-64 md:h-72 w-full">
                <img
                  src={blog.coverImage.url}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col flex-grow items-start">
                
                <div className=" flex flex-col gap-2 items-start  mb-3">
                  <span className="bg-[#EAD5F9] dark:bg-[#47295C] text-[#402060] dark:text-white text-[10px] md:text-xs font-bold px-3 py-3 rounded-full uppercase tracking-wide">
                    {blog.category}
                  </span>
                  <p className="text-[#8E4EC6] text-xs font-medium">
                    •By {blog.author}• {blog.date}
                  </p>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-t-primary dark:text-t-secondary mb-4 leading-snug ">
                  {blog.title}
                </h3>
<a  href={`/blogs/${blog.slug}`} >
                <div className="mt-auto flex items-center text-t-primary  text-sm font-bold ">
read more
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform hover:translate-x-1" />
                </div></a>
              </div>
            </div>
          ))}
        </div>


        <a href="/blogs" >
         <button className="p-4 bg-[#402060] hover:-translate-y-4 hover:scale-110 duration-500 dark:bg-[#6F1595] text-white rounded-xl md:ml-[45%] ml-26 mt-20">
            View more
        </button></a>


</div>

  );
}
