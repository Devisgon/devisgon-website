import data from "../../data/services_page.json";
import allIcons from "../icons";
const ServicesList = () => {
  const services = data.services;

  return (
    <div className="flex flex-col gap-24 py-0">
      {services.map((service, index) => {
            

        return (
          <section key={index} className="px-6 md:px-12 lg:px-20" style={{ backgroundColor: service.bg }}>
            <div className="max-w-7xl mx-auto m-4">
              
              {/* --- Header Section --- */}
              <div className="text-center max-w-3xl mx-auto mb-16 mt-4">
                <h3 className="text-primary font-bold text-lg md:text-xl mb-3">
                  {service.category}
                </h3>
                <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
                  {service.headline}
                  <span className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">{service.span}</span>
                </h2>
                <p className="text-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="flex flex-row justify-center items-center gap-6 mb-16">
                {service.features.map((feature, fIndex) => {
                     const IconComponent = allIcons[feature.icon?.trim()];
                return (
                  <div
                    key={fIndex}
                    className="bg-white border max-w-xl border-purple-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 group"
                  >
                    {/* Icon Box */}
                    <div className="w-12 h-12 rounded-lg bg-[#F3E8FF] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {IconComponent ? ( <IconComponent className="w-6 h-6 text-[#8B3DFF]" />) : ( <span className="text-red-600 text-xs">Icon not found</span>)}

                    </div>
                    <h4 className="text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-secondary leading-relaxed">
                      {feature.details}
                    </p>
                  </div>
                )})}
              </div>

              {/* --- Central Banner Image --- */}
              <div className="relative w-full h-[300px] md:h-[400px]  overflow-hidden mb-12 ">
                 <img 
                   src={service.image} 
                   alt={service.category} 
                   className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-800"
                 />
                 
              </div>

              {/* --- Footer Info (Deliverables & Tech Stack) --- */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-10">
                
                {/* Left: Deliverables */}
                <div className="flex flex-col gap-3 items-center">
                  <span className="text-primary items-center font-bold text-sm uppercase tracking-wide">
                    Deliverables:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {service.deliverables.map((item, i) => (
                      <span 
                        key={i} 
                        className="px-4 py-1.5 rounded-full bg-[#EAD5F9] text-secondary text-xs font-semibold"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Tech Stack */}
                <div className="flex flex-col gap-3 md:items-center">
                  <span className="text-primary font-bold text-sm uppercase tracking-wide">
                    Tech Stack:
                  </span>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {service.tech_stack.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-4 py-1.5 rounded-full bg-[#EAD5F9] text-secondary text-xs font-semibold border border-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </section>
        );
      })}
    </div>
  );
};

export default ServicesList;