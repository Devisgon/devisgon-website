"use client";

import React from "react";

const CallToAction: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#c191e6] via-[#be8ee6] to-[#c9a0e8] dark:from-[#321a47] dark:via-[#402061] dark:to-[#2f1a42] px-8 py-16 md:px-16 text-center shadow-lg">
      <div className="w-full">
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-t-primary">
            Let's Build Smarter, Together
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-white leading-relaxed">
            Talk to our experts and see how Devisgon can accelerate your
            business growth with cutting-edge technology solutions.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contact" className="w-full sm:w-auto">
              <button className="w-full px-6 py-3 rounded-lg bg-btn-primary text-white hover:shadow-2xl hover:shadow-white hover:bg-btn-secondary font-medium transition">
                Book a Consultation
              </button>
            </a>

            <a href="/contact" className="w-full sm:w-auto">
              <button className="w-full px-6 py-3 rounded-lg bg-btn-primary text-white font-medium hover:shadow-2xl hover:shadow-white hover:bg-btn-secondary transition">
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
