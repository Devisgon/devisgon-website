"use client";

const teamMembers = [
  {
    id: 1,
    image: "/home_page/our_team/team01.svg",
    alt: "Team member 1"
  },
  {
    id: 2,
    image: "/home_page/our_team/team02.svg",
    alt: "Team member 2"
  },
  {
    id: 3,
    image: "/home_page/our_team/team03.svg",
    alt: "Team member 3"
  },
  {
    id: 4,
    image: "/home_page/our_team/team04.svg",
    alt: "Team member 4"
  },
  {
    id: 5,
    image: "/home_page/our_team/team05.svg",
    alt: "Team member 5"
  },
  {
    id: 6,
    image: "/home_page/our_team/team06.svg",
    alt: "Team member 6"
  },
  {
    id: 7,
    image: "/home_page/our_team/team07.svg",
    alt: "Team member 7"
  },
  {
    id: 8,
    image: "/home_page/our_team/team08.svg",
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
