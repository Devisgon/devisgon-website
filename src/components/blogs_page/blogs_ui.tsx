/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

const uiByLang: Record<
  string,
  { all: string; by: string; readMore: string; viewMore: string; fallbackAuthor: string }
> = {
  en: { all: "All", by: "By", readMore: "Read More", viewMore: "View More", fallbackAuthor: "Devisgon Team" },
  ur: { all: "سب", by: "از", readMore: "مزید پڑھیں", viewMore: "مزید دیکھیں", fallbackAuthor: "ڈیویسگون ٹیم" },
  ar: { all: "الكل", by: "بواسطة", readMore: "اقرأ المزيد", viewMore: "عرض المزيد", fallbackAuthor: "فريق ديفِسغون" },
  zh: { all: "全部", by: "作者", readMore: "阅读更多", viewMore: "查看更多", fallbackAuthor: "Devisgon 团队" },
  es: { all: "Todo", by: "Por", readMore: "Leer mas", viewMore: "Ver mas", fallbackAuthor: "Equipo Devisgon" },
  de: { all: "Alle", by: "Von", readMore: "Mehr lesen", viewMore: "Mehr anzeigen", fallbackAuthor: "Devisgon Team" },
  fr: { all: "Tous", by: "Par", readMore: "Lire plus", viewMore: "Voir plus", fallbackAuthor: "Equipe Devisgon" },
};

export function CategoryNav({ blogs, categories, lang }: any) {
  const copy = uiByLang[lang] ?? uiByLang.en;
  const [activeCategory, setActiveCategory] = useState(copy.all);

  const localizedCategories = useMemo(
    () => [copy.all, ...categories.filter((cat: string) => cat !== "All")],
    [categories, copy.all],
  );

  useEffect(() => {
    setActiveCategory(copy.all);
  }, [copy.all, categories]);

  const filteredBlogs =
    activeCategory === copy.all
      ? blogs
      : blogs.filter((b: any) => b.category === activeCategory);

  return (
    <div>
      <div className="md:flex md:flex-wrap justify-start md:gap-3 grid grid-cols-3 mb-12">
        {localizedCategories.map((cat: string) => (
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
              <Image
                src={blog.coverImage.url}
                alt={blog.title}
                width={100}
                height={100}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col flex-grow items-start">
              <div className=" flex flex-col gap-2 items-start  mb-3">
                <span className="bg-[#EAD5F9] dark:bg-[#47295C] text-[#402060] dark:text-white text-[10px] md:text-xs font-bold px-3 py-3 rounded-full uppercase tracking-wide">
                  {blog.category}
                </span>
                <p className="text-[#8E4EC6] text-xs font-medium">
                  {copy.by} {blog.author || copy.fallbackAuthor} • {blog.date}
                </p>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-t-primary dark:text-t-secondary mb-4 leading-snug ">
                {blog.title}
              </h3>
              <a href={`/blogs/${blog.slug}`}>
                <div className="mt-auto flex items-center text-t-primary  text-sm font-bold ">
                  {copy.readMore}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform hover:translate-x-1" />
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>

      <Link href="/blogs">
        <button className="p-4 bg-[#402060] hover:-translate-y-4 ml-[30%] hover:scale-110 duration-500 dark:bg-[#6F1595] text-white rounded-xl md:ml-[40%] mt-20">
          {copy.viewMore}
        </button>
      </Link>
    </div>
  );
}
