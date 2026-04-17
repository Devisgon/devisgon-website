"use client";

import dynamic from "next/dynamic";

import type { TestimonialData } from "@/types/homepage/comments";

type DeferredInteractiveSectionsProps = {
  testimonialsSection: TestimonialData;
};

const Comments = dynamic(() => import("@/components/home_page/comments_section"), {
  ssr: false,
  loading: () => <section className="py-20" />,
});

export default function DeferredInteractiveSections({
  testimonialsSection,
}: DeferredInteractiveSectionsProps) {
  return (
    <>
      <Comments data={testimonialsSection} />
    </>
  );
}
