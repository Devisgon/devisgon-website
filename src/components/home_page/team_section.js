"use client";

const teamMembers = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=400&fit=crop&crop=face",
    alt: "Team member 1"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=400&fit=crop&crop=face",
    alt: "Team member 2"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop&crop=face",
    alt: "Team member 3"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=400&fit=crop&crop=face",
    alt: "Team member 4"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",
    alt: "Team member 5"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face",
    alt: "Team member 6"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300&h=400&fit=crop&crop=face",
    alt: "Team member 7"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=400&fit=crop&crop=face",
    alt: "Team member 8"
  }
];

const TeamSection = () => {
  return (
    <section className="py-20 px-4 bg-[#F7EDFE]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-3xl font-bold text-primary text-center mb-16">
          Meet Our Team
        </h2>

        <div className="flex justify-center items-center gap-4 md:gap-6  ">
          {teamMembers.map((member, index) => {
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
                  className="w-full h-full object-cover"
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
