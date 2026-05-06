import type { TechnologyConversationSection } from "@/types/technologies_page";

type TechnologyConversationProps = {
  data: TechnologyConversationSection;
};

export default function TechnologyConversation({ data }: TechnologyConversationProps) {
  return (
    <section className="w-full bg-bg-secondary px-6 pb-16 pt-14 md:px-12 md:pb-24 md:pt-20 transition-colors duration-300">
      <div className="mx-auto max-w-4xl rounded-3xl border border-[color:var(--primry)] bg-bg-primary p-6 shadow-xl md:p-10">
        <h2 className="text-center text-4xl font-black text-t-primary md:text-5xl">{data.title}</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm font-semibold text-t-secondary md:text-base">{data.subtitle}</p>

        <form className="mt-8 space-y-5" action="/contact" method="get">
          <div className="grid gap-6 md:grid-cols-3">
            <label className="flex flex-col gap-2 text-xs font-black uppercase tracking-[0.1em] text-t-secondary">
              {data.full_name_label}
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="h-12 w-full rounded-xl border border-[color:var(--primry)] bg-bg-secondary px-4 text-sm text-t-primary outline-none transition-all placeholder:text-t-secondary/60 focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20"
              />
            </label>

            <label className="flex flex-col gap-2 text-xs font-black uppercase tracking-[0.1em] text-t-secondary">
              {data.business_email_label}
              <input
                type="email"
                name="email"
                placeholder="example@company.com"
                required
                className="h-12 w-full rounded-xl border border-[color:var(--primry)] bg-bg-secondary px-4 text-sm text-t-primary outline-none transition-all placeholder:text-t-secondary/60 focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20"
              />
            </label>

            <label className="flex flex-col gap-2 text-xs font-black uppercase tracking-[0.1em] text-t-secondary">
              Phone Number
              <input
                type="tel"
                name="phone"
                placeholder="+92 300 1234567"
                required
                className="h-12 w-full rounded-xl border border-[color:var(--primry)] bg-bg-secondary px-4 text-sm text-t-primary outline-none transition-all placeholder:text-t-secondary/60 focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-xs font-black uppercase tracking-[0.1em] text-t-secondary">
            {data.message_label}
            <textarea
              name="message"
              rows={4}
              placeholder={data.message_placeholder}
              required
              className="w-full rounded-xl border border-[color:var(--primry)] bg-bg-secondary px-4 py-3 text-sm text-t-primary outline-none transition-all placeholder:text-t-secondary/60 focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20"
            />
          </label>

          <div className="pt-2">
            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-btn-primary text-sm font-bold text-btn-secondary transition-colors hover:opacity-90"
            >
              {data.button_text}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
