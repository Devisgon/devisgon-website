import { CEOSectionProps } from "@/types/homepage/ceo"
import Image from "next/image";

const CEOSection = ({ data }: CEOSectionProps) => {
  if (!data) return null;

  return (
    <section id="about" className=" p-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <div className="relative  rounded-2xl shadow-[0px_85.26px_181.4px_0px_rgba(21, 21, 21, 0.15)] p-4 pt-8">
          <div className="flex justify-center -translate-y-10">
            <div className="w-68 md:w-96 h-84 rounded-xl overflow-hidden shadow-lg">
            <Image
  src="/home_page/ceo_section/ceo.png"
  alt="CEO"
  width={442}
  height={340}
  sizes="(max-width: 768px) 100vw, 442px"
  className="w-full h-full object-cover object-top"
/>
            </div>
          </div>
          
          <div className="bg-background dark:bg-[#ECD9FA] rounded-2xl p-4  -mt-40 border-t-[6px] border-[#D1AFEC] dark:border-[#664282] shadow-xl">
            <div className="absolute left-10 top-28 text-[300px]  dark:text-[#8457AA]/10 font-bold text-t-primary/10">
              “
            </div>

            <div className="relative text-center space-y-10  mt-30">
              <p className="text-2xl md:text-3xl font-bold text-t-primary dark:text-[#402060]">
                {data.title}
              </p>

              <p className="text-t-secondary text-sm md:text-base leading-relaxed max-w-xl mx-auto">
                &quot;At <span className="font-semibold text-secondary">Devisgon</span>
                {data.quote}&quot;
              </p>

              <div className="space-y-1">
                <p className="text-xl font-bold text-t-primary dark:text-[#402060]">{data.author}</p>
                <p className="text-t-secondary font-medium">{data.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOSection;
