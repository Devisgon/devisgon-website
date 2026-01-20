"use client";
import  { useState } from "react";
import { ArrowRight } from "lucide-react";

import { BlogSectionProps } from "@/types/homepage/blog"

const BlogSection = ({ data }: BlogSectionProps) => {  
  const [activeCategory, setActiveCategory] = useState<string>("All Categories");

  const filteredPosts =
    activeCategory == "All Categories"
      ? data.posts
      : data.posts.filter(
          (post) => post.category.toUpperCase() === activeCategory.toUpperCase()
        );

  return (
    <section className="py-25 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mt-2">
          <h3 className="text-t-primary font-bold text-4xl mb-4">
            {data.header_title}
          </h3>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-t-primary mb-6 leading-tight">
            {data.main_title}
          </h2>
          <p className="text-t_secondary font-medium text-sm md:text-base">
            {data.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap justify-start gap-3 mb-12">
          {data.categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`
                px-6 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-300
                ${
                  activeCategory === category
                    ? "bg-[#9f7ab9] text-white" 
                    : "bg-transparent text-t_secondary hover:bg-[#9f7ab9] " 
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {filteredPosts.map((post, index) => (
            <div key={index} className="group cursor-pointer flex flex-col h-full">
              
              <div className="rounded-2xl overflow-hidden mb-6 h-64 md:h-72 w-full">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col flex-grow items-start">
                
                <div className=" flex flex-col gap-2 items-start  mb-3">
                  <span className="bg-[#EAD5F9] text-[#402060] text-[10px] md:text-xs font-bold px-3 py-3 rounded-full uppercase tracking-wide">
                    {post.category}
                  </span>
                  <p className="text-t-primary text-xs font-medium">
                    • Devison Tech Blog • {post.date}
                  </p>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-t-primary mb-4 leading-snug ">
                  {post.title}
                </h3>

                <div className="mt-auto flex items-center text-t-primary text-sm font-bold ">
                  {post.link_text}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
         <button className="p-4 bg-primary text-white rounded-xl ml-[40%] mt-20">
            View more
        </button>

      </div>
       
       
    </section>
  );
};

export default BlogSection;