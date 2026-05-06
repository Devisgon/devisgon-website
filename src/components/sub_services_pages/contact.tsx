import DirectInquiryForm from "@/components/direct_inquiry_form";

type CallToActionProps = {
  serviceName?: string;
  sourcePage?: string;
};

const CallToAction = ({ serviceName = "Services", sourcePage = "/services" }: CallToActionProps) => {
  return (
    <section className="relative w-screen overflow-hidden bg-gradient-to-r from-[#c191e6] via-[#be8ee6] to-[#c9a0e8] px-8 py-16 text-center shadow-lg dark:from-[#321a47] dark:via-[#402061] dark:to-[#2f1a42] md:w-full md:px-16">
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-t-primary md:text-4xl lg:text-5xl">Let&apos;s Build Smarter, Together</h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white md:text-lg">
          Talk to our experts and see how Devisgon can accelerate your business growth with cutting-edge technology
          solutions.
        </p>

        <DirectInquiryForm
          buttonText="Send Inquiry"
          serviceName={serviceName}
          sourcePage={sourcePage}
          sourceType="service"
        />
      </div>
    </section>
  );
};

export default CallToAction;
