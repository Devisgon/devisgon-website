type ServicesCtaData = {
  headline: string;
  description: string;
};

type ServicesCtaSectionProps = {
  data?: ServicesCtaData;
  consultationHref?: string;
};

const defaultCtaData: ServicesCtaData = {
  headline: "Let's Build Smarter, Together",
  description:
    "Talk to our experts and see how Devisgon can accelerate your business growth with cutting-edge technology solutions.",
};

const ServicesCtaSection = ({ data = defaultCtaData, consultationHref }: ServicesCtaSectionProps) => {
  const meetingHref =
    consultationHref ||
    process.env.NEXT_PUBLIC_CALENDLY_30_MIN_MEETING ||
    process.env.NEXT_PUBLIC_CALENDLY_15_MIN_MEETING ||
    "/contact";

  return (
    <section className="bg-[#caa4eb] px-6 py-18 md:py-22">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <h2 className="text-3xl font-extrabold leading-tight text-[#402060] md:text-5xl">
          {data.headline}
        </h2>
        <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white md:text-xl">
          {data.description}
        </p>
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <a
            href={meetingHref}
            className="inline-flex min-h-14 w-full items-center justify-center rounded-lg bg-[#8145B5] px-9 text-base font-bold text-white shadow-sm transition hover:bg-[#6F1595] sm:w-auto"
          >
            Book a Consultation
          </a>
          <a
            href="/contact"
            className="inline-flex min-h-14 w-full items-center justify-center rounded-lg border-2 border-[#8145B5] px-9 text-base font-bold text-[#8145B5] transition hover:bg-[#8145B5] hover:text-white sm:w-auto"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesCtaSection;
