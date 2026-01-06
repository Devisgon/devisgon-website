"use client";

import React from 'react';
import { Play } from 'lucide-react'; // Make sure to install lucide-react: npm i lucide-react

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#FDF4FF] overflow-hidden flex items-center justify-center py-20">
      
      {/* --- Background Circles (Custom CSS/Tailwind) --- */}
      {/* Large Left Circle */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-20 w-[600px] h-[600px] rounded-full border-[60px] border-purple-200/40 pointer-events-none" />
      {/* Inner Left Circle */}
      <div className="absolute top-1/2 -translate-y-1/2 left-20 w-[400px] h-[400px] rounded-full border-[40px] border-purple-200/30 pointer-events-none" />
      {/* Right Circle */}
      <div className="absolute top-20 -right-20 w-[300px] h-[300px] rounded-full border-[30px] border-purple-200/50 pointer-events-none" />


      {/* --- Main Content Container --- */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          
          {/* Left Side: Text Card */}
          <div className="w-full lg:w-2/3 bg-[#E9D5FF] rounded-[3rem] p-8 md:p-16 lg:pr-32 shadow-sm relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-[#581C87] mb-2 tracking-tight">
              AI-Powered Apps
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-[#6B21A8]/80 mb-6">
              Smarter, Faster, Adaptive Software
            </h2>
            
            <p className="text-[#7E22CE] text-lg md:text-xl font-medium mb-10 max-w-lg leading-relaxed">
              We build AI-driven applications that understand, predict, and personalize, helping your business run smarter.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#7E22CE] hover:bg-[#6B21A8] text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-md">
                Start My AI Project
              </button>
              <button className="bg-transparent border-2 border-[#7E22CE] text-[#7E22CE] hover:bg-[#7E22CE] hover:text-white font-semibold py-4 px-8 rounded-xl transition-all">
                Contact Us
              </button>
            </div>
          </div>

          {/* Right Side: Phone Image/Mockup */}
          {/* Negative margin on desktop to create the overlap effect */}
          <div className="w-full lg:w-1/3 mt-10 lg:mt-0 lg:-ml-24 relative z-20">
            <div className="relative mx-auto w-[300px] h-[600px] bg-gray-900 rounded-[3rem] shadow-2xl border-8 border-gray-900 overflow-hidden">
              
              {/* Placeholder Image - Replace 'src' with your actual phone screenshot */}
              <img 
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" 
                alt="App Interface" 
                className="w-full h-full object-cover opacity-60"
              />
              
              {/* Overlay Content on Phone */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 flex flex-col justify-between p-6">
                <div>
                  <h3 className="text-white text-3xl font-bold leading-tight">
                    Our Work.<br />Their Words.
                  </h3>
                  <div className="flex gap-1 mt-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                  </div>
                </div>

                {/* Fake UI Elements to mimic the screenshot */}
                <div className="space-y-4">
                    {/* Chat Bubble Mimic */}
                    <div className="bg-gray-800/80 backdrop-blur-md p-4 rounded-2xl border border-gray-700">
                        <div className="flex items-center gap-3 mb-2">
                             <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                             <div className="text-xs text-gray-300">ChatGPT</div>
                        </div>
                        <p className="text-gray-200 text-sm">
                            "Tampa boasts a vibrant culinary scene..."
                        </p>
                    </div>
                    
                    {/* Play Button Circle */}
                    <div className="flex justify-end">
                        <button className="w-12 h-12 bg-black rounded-full flex items-center justify-center border border-white/20">
                            <Play className="text-white fill-current w-5 h-5 ml-1" />
                        </button>
                    </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;