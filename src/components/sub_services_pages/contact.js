"use client";

const CallToAction = () => {
  return (
    <section className="relative overflow-hidden  bg-gradient-to-r from-[#c9a3f3] via-[#d7b7f6] to-[#e6cff9] px-8 py-16 md:px-16 text-center shadow-lg">
      <div className="w-full">
        <div >
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
            Let's Build Smarter, Together
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-white leading-relaxed">
            Talk to our experts and see how Devisgon can accelerate your
            business growth with cutting-edge technology solutions.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-6 py-3 rounded-lg bg-[#8145B5] text-white font-medium  transition">
              Book a Consultation
            </button>

            <button className="px-6 py-3 rounded-lg border border-[#7c3aed] text-primary font-medium  hover:text-white transition">
              Contact Us
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CallToAction;
