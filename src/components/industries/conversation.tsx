import DirectInquiryForm from "@/components/direct_inquiry_form";
import type { IndustryConversationSection, IndustryPageProps } from "@/types/industries_page";

type IndustryConversationProps = IndustryPageProps<IndustryConversationSection> & {
  industryName: string;
  sourcePage: string;
};

export default function IndustryConversation({ data, industryName, sourcePage }: IndustryConversationProps) {
  return (
    <section className="w-full bg-bg-primary px-6 pb-16 pt-14 transition-colors duration-300 md:px-12 md:pb-24 md:pt-20">
      <div className="mx-auto max-w-4xl rounded-3xl border border-primary bg-background p-6 shadow-xl md:p-10">
        <h2 className="text-center text-3xl font-extrabold text-t-primary md:text-5xl">{data.title}</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm font-medium text-t-secondary md:text-base">
          {data.subtitle}
        </p>

        <DirectInquiryForm
          buttonText={data.button_text}
          industryName={industryName}
          serviceName="Industry Services"
          sourcePage={sourcePage}
          sourceType="industry"
        />
      </div>
    </section>
  );
}
