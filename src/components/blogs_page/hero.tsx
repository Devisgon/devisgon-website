import type { BlogSectionProps } from "@/types/homepage/blog";
const BlogSection = ({ data }: BlogSectionProps) => {
 return (
      <div className="max-w-9xl mx-auto">
        
        <div className="text-center max-w-5xl mx-auto mb-12">
          <h3 className="text-t-primary font-bold text-3xl md:text-4xl mb-4">
            {data.header_title}
          </h3>
          <h2 className="text-xl md:text-5xl lg:text-5xl font-bold text-t-primary dark:text-[#8E4EC6]  mb-6 leading-tight">
            {data.main_title}
          </h2>
          <p className="text-t-secondary font-medium text-sm md:text-base">
            {data.subtitle}
          </p>
        </div>
        </div>
  );
};

export default BlogSection;