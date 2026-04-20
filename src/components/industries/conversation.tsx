import Link from "next/link";
import type { IndustryConversationSection, IndustryPageProps } from "@/types/industries_page";

export default function IndustryConversation({ data }: IndustryPageProps<IndustryConversationSection>) {
  return (
    // Changed bg-background to bg-bg-primary
    <section className="w-full bg-bg-primary px-6 pb-16 pt-14 md:px-12 md:pb-24 md:pt-20 transition-colors duration-300">
      
      {/* The card now uses bg-background or bg-bg-secondary to pop against the section background */}
      <div className="mx-auto max-w-4xl rounded-3xl border border-primary bg-background p-6 shadow-xl md:p-10">
        <h2 className="text-center text-3xl font-extrabold text-t-primary md:text-5xl">
          {data.title}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm font-medium text-t-secondary md:text-base">
          {data.subtitle}
        </p>

        <form className="mt-8 space-y-5" action="/contact" method="get">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs font-black uppercase tracking-[0.1em] text-t-secondary">
              {data.full_name_label}
              <input
                type="text"
                name="fullName"
                placeholder={data.full_name_placeholder}
                // Input bg changed to bg-bg-primary for an "inset" feel
                className="h-12 w-full rounded-xl border border-primary bg-bg-primary px-4 text-sm text-t-primary outline-none transition-all placeholder:text-t-secondary/40 focus:ring-2 focus:ring-btn-primary/20 focus:border-btn-primary"
              />
            </label>

            <label className="flex flex-col gap-2 text-xs font-black uppercase tracking-[0.1em] text-t-secondary">
              {data.business_email_label}
              <input
                type="email"
                name="businessEmail"
                placeholder={data.business_email_placeholder}
                className="h-12 w-full rounded-xl border border-primary bg-bg-primary px-4 text-sm text-t-primary outline-none transition-all placeholder:text-t-secondary/40 focus:ring-2 focus:ring-btn-primary/20 focus:border-btn-primary"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-xs font-black uppercase tracking-[0.1em] text-t-secondary">
            {data.message_label}
            <textarea
              name="message"
              rows={4}
              placeholder={data.message_placeholder}
              className="w-full rounded-xl border border-primary bg-bg-primary px-4 py-3 text-sm text-t-primary outline-none transition-all placeholder:text-t-secondary/40 focus:ring-2 focus:ring-btn-primary/20 focus:border-btn-primary"
            />
          </label>

          <div className="pt-2">
            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-btn-primary text-sm font-bold text-btn-secondary shadow-lg transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
            >
              {data.button_text}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-t-secondary">
          Need a custom workflow?{" "}
          <Link href="/contact" className="font-bold text-btn-primary hover:underline underline-offset-4">
            Contact our team directly.
          </Link>
        </p>
      </div>
    </section>
  );
}