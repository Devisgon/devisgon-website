"use client";

import dynamic from "next/dynamic";
import { type ReactNode, useEffect, useRef, useState } from "react";
import DeferredInteractiveSections from "@/components/home_page/deferred_interactive_sections";

import type { SolutionsSectionData } from "@/types/homepage/solution";
import type { ProcessSectionData } from "@/types/homepage/process";
import type { TestimonialData } from "@/types/homepage/comments";
import type { CEOData } from "@/types/homepage/ceo";
import type { TeamMember } from "@/types/homepage/team";

type DeferredSectionsProps = {
  solutionsSection: SolutionsSectionData;
  workingProcess: ProcessSectionData;
  testimonialsSection: TestimonialData;
  ceoMessageSection: CEOData;
  teamMembers: TeamMember[];
};

// Code-split below-the-fold homepage islands so animation-heavy chunks such as
// framer-motion are not part of the initial hero/services route JavaScript.
const Award = dynamic(() => import("@/components/home_page/award"), {
  ssr: false,
  loading: () => <section className="py-20" />,
});

const Solution = dynamic(() => import("@/components/home_page/solution_section"), {
  ssr: false,
  loading: () => <section className="py-16" />,
});

const Ceo = dynamic(() => import("@/components/home_page/ceo_section"), {
  ssr: false,
  loading: () => <section className="py-16" />,
});

const WorkingProgress = dynamic(() => import("@/components/home_page/working_progress"), {
  ssr: false,
  loading: () => <section className="py-20" />,
});

const TeamSection = dynamic(() => import("@/components/home_page/team_section"), {
  ssr: false,
  loading: () => <section className="py-16" />,
});

function LazySection({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const section = ref.current;

    if (!section || isReady) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "700px 0px" },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [isReady]);

  return (
    <section ref={ref} className={className}>
      {isReady ? children : null}
    </section>
  );
}

export default function DeferredSections({
  solutionsSection,
  workingProcess,
  testimonialsSection,
  ceoMessageSection,
  teamMembers,
}: DeferredSectionsProps) {
  return (
    <>
      <LazySection className="min-h-64">
        <Award />
      </LazySection>
      <LazySection className="min-h-96">
        <Solution data={solutionsSection} />
      </LazySection>
      <LazySection className="min-h-96">
        <Ceo data={ceoMessageSection} />
      </LazySection>
      <LazySection className="min-h-96">
        <WorkingProgress data={workingProcess} />
      </LazySection>
      <LazySection className="min-h-96">
        <DeferredInteractiveSections testimonialsSection={testimonialsSection} />
      </LazySection>
      <LazySection className="min-h-96">
        <TeamSection data={teamMembers} />
      </LazySection>
    </>
  );
}
