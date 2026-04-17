import type { TeamSectionProps } from "@/types/homepage/team";
import Link from "next/link";

const TeamSection = ({ data }: TeamSectionProps) => {
  return (
    <section className="py-20 px-4 md:h-screen lg:h-auto bg-bg-primary">
      <div className="mx-auto">
        <h2 className="text-3xl font-bold text-t-primary text-center mb-16">
          Meet Our Team
        </h2>

        <div className="md:flex grid grid-cols-2 justify-center md:justify-between items-center gap-4 md:gap-6">
          {data.map((member, index) => {
            const isFromTop = index % 2 === 0;

            return (
              <div
                key={member.id}
                className="relative w-36 md:w-32 lg:w-72 h-72 md:h-52 lg:h-72 xl:h-94 rounded-full overflow-hidden group bg-black hover:scale-105 transition-transform cursor-pointer"
                style={{
                  marginBottom: isFromTop ? "60px" : "0px",
                }}
              >
                <img
                  src={member.image}
                  alt={member.alt}
                  className="w-full h-full bg-[#c2bebf] object-cover group-hover:opacity-50 transition-opacity"
                  loading="lazy"
                />

                <div className="absolute -top-24 right-2 h-full flex items-center px-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <p className="text-white font-semibold text-center items-center text-sm md:text-base lg:text-lg transform -rotate-90 origin-right whitespace-nowrap">
                    {member.alt}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/get-started"
            className="inline-block bg-gradient-to-r from-[#8E4EC6] to-[#D1AFEC] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow"
          >
            Join Our Team
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
