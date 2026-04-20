import Link from "next/link";
import type { IndustryConversationSection, IndustryPageProps } from "@/types/industries_page";

export default function IndustryConversation({ data }: IndustryPageProps<IndustryConversationSection>) {
  return (
    <section className="w-screen md:w-full bg-bg-primary px-6 pb-16 pt-14 md:px-12 md:pb-24 md:pt-20">
      <div className="mx-auto max-w-4xl border border-[#E2D2EF] bg-bg-secondary/92 p-6 md:p-10">
        <h2 className="text-center text-3xl font-extrabold text-t-primary md:text-5xl">{data.title}</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm font-medium text-t-secondary dark:text-t-primary md:text-base">
          {data.subtitle}
        </p>

        <form className="mt-8 space-y-4" action="/contact" method="get">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-xs font-black uppercase tracking-[0.1em] text-t-secondary">
              {data.full_name_label}
              <input
                type="text"
                name="fullName"
                placeholder={data.full_name_placeholder}
                className="mt-2 h-11 w-full border border-[#E8DAF4] bg-background px-3 text-sm text-t-primary outline-none ring-0 placeholder:text-t-secondary/70 focus:border-[#8E4EC6]"
              />
            </label>

            <label className="text-xs font-black uppercase tracking-[0.1em] text-t-secondary">
              {data.business_email_label}
              <input
                type="email"
                name="businessEmail"
                placeholder={data.business_email_placeholder}
                className="mt-2 h-11 w-full border border-[#E8DAF4] bg-background px-3 text-sm text-t-primary outline-none ring-0 placeholder:text-t-secondary/70 focus:border-[#8E4EC6]"
              />
            </label>
          </div>

          <label className="text-xs font-black uppercase tracking-[0.1em] text-t-secondary">
            {data.message_label}
            <textarea
              name="message"
              rows={4}
              placeholder={data.message_placeholder}
              className="mt-2 w-full border border-[#E8DAF4] bg-background px-3 py-3 text-sm text-t-primary outline-none ring-0 placeholder:text-t-secondary/70 focus:border-[#8E4EC6]"
            />
          </label>

          <div className="pt-2">
            <button
              type="submit"
              className="h-11 w-full bg-btn-primary text-sm font-semibold text-btn-secondary shadow-[0_8px_24px_rgba(118,64,168,0.35)] transition hover:opacity-90"
            >
              {data.button_text}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-xs text-t-secondary dark:text-t-primary">
          Need a custom workflow? <Link href="/contact" className="font-semibold text-[#8E4EC6]">Contact our team directly.</Link>
        </p>
      </div>
    </section>
  );
}

