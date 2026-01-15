"use client";
const TeamSection = ({data}) => {
  return (
    <section className="py-20 px-4  bg-bg-primary">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-3xl font-bold text-t-primary text-center mb-16">
          Meet Our Team
        </h2>

        <div className="md:flex grid grid-cols-2 relative justify-center items-center gap-4 md:gap-6  ">
          {data.map((member, index) => {
            const isHigher = index % 2 === 0;
            
            return (
              <div
                key={member.id}
                className="w-36  md:w-32 lg:w-36 h-72 md:h-52 lg:h-72 rounded-full overflow-hidden inset-0 group bg-black transition-transform duration-300 hover:scale-105"
                style={{
                  marginBottom: isHigher ? '60px' : '0px',
                  borderRadius: '9999px'
                }}
              >
                <img
                  src={member.image}
                  alt={member.alt}
                  className="w-full h-full object-cover inset-0 bg-black group-hover:opacity-50  hover:opacity-50"
                />
                 <div className="absolute -top-18 right-2 h-full flex items-center px-2 opacity-0  group-hover:opacity-100 transition-opacity duration-300 rounded-r-full">
                    <p className="text-white font-semibold text-sm md:text-base lg:text-lg transform -rotate-90 origin-right whitespace-nowrap">
                       {member.alt}
                   </p> 
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
