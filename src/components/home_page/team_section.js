"use client";
const TeamSection = ({data}) => {
  return (
    <section className="py-20 px-4 bg-bg-primary">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-3xl font-bold text-primary text-center mb-16">
          Meet Our Team
        </h2>

        <div className="flex justify-center items-center gap-4 md:gap-6  ">
          {data.map((member, index) => {
            const isHigher = index % 2 === 0;
            
            return (
              <div
                key={member.id}
                className="w-24 md:w-32 lg:w-36 h-36 md:h-52 lg:h-72 rounded-full overflow-hidden transition-transform duration-300 hover:scale-105"
                style={{
                  marginBottom: isHigher ? '60px' : '0px',
                  borderRadius: '9999px'
                }}
              >
                <img
                  src={member.image}
                  alt={member.alt}
                  className="w-full h-full object-cover "
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
