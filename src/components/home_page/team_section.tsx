"use client";
import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import type { TeamSectionProps } from "@/types/homepage/team";
import Link from "next/dist/client/link";

const TeamSection = ({ data }: TeamSectionProps) => {
  const [activeId, setActiveId] = useState<string | number | null>(null);
    const [isFormActive, setIsFormActive] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/globals/form-settings");
        if (res.ok) {
          const settingsData = await res.json();
          if (settingsData.isGetStartedFormActive !== undefined) {
            setIsFormActive(settingsData.isGetStartedFormActive);
          }
        }
      } catch (error) {
        console.error("Failed to fetch form settings", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  if (isLoading) {
    return null; // or a loading skeleton
  }

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
              <motion.div
                onClick={() => setActiveId(activeId === member.id ? null : member.id)}
                key={member.id}
                initial={{
                  opacity: 0,
                  y: isFromTop ? -40 : 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  type: "tween",
                }}
                className="relative w-36 md:w-32 lg:w-72 h-72 md:h-52 lg:h-72 xl:h-94 rounded-full overflow-hidden group bg-black hover:scale-105 transition-transform cursor-pointer"
                style={{
                  marginBottom: isFromTop ? "60px" : "0px",
                }}
              >
                <img
                  src={member.image}
                  alt={member.alt}
                  className={`w-full h-full bg-[#c2bebf] object-cover group-hover:opacity-50 transition-opacity
                   ${
                      activeId == member.id
                        ? "opacity-50"
                        : "opacity-100"
                     }`}
                />

                <div
                  className={`absolute -top-24 right-2 h-full flex items-center px-2
                    transition-opacity duration-300
                    ${
                      activeId == member.id
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                >
                  <p className="text-white font-semibold text-center items-center text-sm md:text-base lg:text-lg transform -rotate-90 origin-right whitespace-nowrap">
                    {member.alt}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
         {isFormActive && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/get-started"
              className="inline-block bg-gradient-to-r from-[#8E4EC6] to-[#D1AFEC] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow"
            >
              Join Our Team
            </Link>
          </motion.div>)}
      </div>
    </section>
  );
};

export default TeamSection;