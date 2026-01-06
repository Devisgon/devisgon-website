import React from 'react';

// FIX 1: Destructure 'data' from props using { data }
const CEOSection = ({ data }) => {
  // Safety check: ensure data exists before rendering to prevent errors
  if (!data) return null;

  return (
    <section id="about" className="py-20 bg-[#FBF7FE]">
      <div className="max-w-2xl mx-auto">
        <div className="relative bg-card rounded-2xl shadow-testimonial p-12 pt-8">
          {/* CEO Image */}
          <div className="flex justify-center -translate-y-10">
            <div className="w-96 h-84 rounded-xl overflow-hidden shadow-lg">
              <img
                src={data.image}
                alt="CEO"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* FIX 2: Fixed background color syntax and border width syntax */}
          <div className="bg-[#FBF7FE] rounded-2xl p-6 -mt-38 border-t-[6px] border-[#D1AFEC] shadow-xl">
            <div className="absolute left-10 top-28 text-[300px] font-serif font-bold text-primary/10">
              “
            </div>

            {/* Content */}
            <div className="relative text-center space-y-6 mt-24">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                {data.title}
              </h2>

              <p className="text-secondary text-sm md:text-base leading-relaxed max-w-lg mx-auto">
                "At <span className="font-semibold text-secondary">Devisgon</span>
                {data.quote}
                " {/* Added closing quote here for visual consistency */}
              </p>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-primary">{data.author}</h3>
                <p className="text-secondary font-medium">{data.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOSection;