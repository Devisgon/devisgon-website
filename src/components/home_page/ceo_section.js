const CEOSection = () => {
  return (
    <section id="about" className="py-20  bg-[#FBF7FE]">
      <div className="max-w-2xl mx-auto">
        <div className="relative bg-card rounded-2xl shadow-testimonial p-12 pt-8">
          {/* CEO Image */}
          <div className="flex justify-center -translate-y-10">
            <div className="w-96 h-84 rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face"
                alt="CEO"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="bg-#FBF7FE rounded-2xl p-6 -mt-38 border-t-6 border-[#D1AFEC]  shadow-xl">
          <div className="absolute left-10 top-28  text-[300px] font-serif font-bold text-primary/10  ">
            “
          </div>

          {/* Content */}
          <div className="relative text-center space-y-6 mt-24">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              A Message from Our CEO
            </h2>

            <p className="text-secondary text-sm md:text-base leading-relaxed max-w-lg mx-auto">
              "At <span className="font-semibold text-secondary ">Devisgon</span>, we believe innovation drives the future.
              Our mission is simple: make AI-powered technology practical and accessible for
              every business. With 300+ clients and 20+ startups, we've seen automation
              improve efficiency and reshape customer experiences. Together, let's build
              smarter, scalable, and secure solutions for tomorrow."
            </p>


            <div className="space-y-1">
              <h3 className="text-xl font-bold text-primary">Zainab Abdullah</h3>
              <p className="text-secondary font-medium">CEO, Devisgon Pvt. Ltd.</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOSection;
