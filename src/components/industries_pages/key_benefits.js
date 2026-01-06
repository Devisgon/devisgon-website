"use client";
import React from 'react';
// Assuming you have imported all icons as an object named AllIcons
// Example: import * as AllIcons from 'react-icons/fa'; (or your specific setup)
import * as FaIcons from "react-icons/fa"; 
import * as PiIcons from "react-icons/pi";
import * as MdIcons from "react-icons/md";

// Combine them for the demo (In your project, just use your existing AllIcons import)
const AllIcons = { ...FaIcons, ...PiIcons, ...MdIcons };

const KeyBenefitsSection = ({ data }) => {
  // Destructure section data

  return (
    <section className="w-full bg-[#FAFAFF] py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        
        {/* --- Section Header --- */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#2E1065] mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-[#7E22CE]/80 font-medium">
            {data.subtitle}
          </p>
        </div>

        {/* --- Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.cards.map((card, index) => {
            // Clean the icon name (remove spaces) and find it in AllIcons
            const iconName = card.icon_type.trim();
            const IconComponent = AllIcons[iconName];

            return (
              <div 
                key={index} 
                className="bg-white border border-purple-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col items-start"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 bg-[#F3E8FF] rounded-xl flex items-center justify-center mb-6 text-[#9333EA]">
                  {IconComponent ? (
                    <IconComponent size={28} />
                  ) : (
                    // Fallback if icon name is misspelled or missing
                    <span className="text-xs">No Icon</span>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#2E1065] mb-3">
                  {card.title}
                </h3>
                <p className="text-[#6B5B95] leading-relaxed text-sm">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default KeyBenefitsSection;