"use client";

import type { MouseEvent } from "react";

type IndustryProjectBriefCtaProps = {
  label: string;
  variant?: "hero" | "section";
};

export default function IndustryProjectBriefCta({
  label,
  variant = "section",
}: IndustryProjectBriefCtaProps) {
  function scrollToBrief(event: MouseEvent<HTMLAnchorElement>) {
    const brief = document.getElementById("industry-project-brief");
    if (!brief) return;

    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    brief.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
    });
  }

  const style =
    variant === "hero"
      ? "bg-btn-primary text-white shadow-xl hover:-translate-y-0.5 hover:bg-[#76159A]"
      : "bg-btn-primary text-white shadow-lg hover:-translate-y-0.5 hover:bg-[#76159A]";

  return (
    <a
      href="#industry-project-brief"
      onClick={scrollToBrief}
      className={
        "inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primry)] " +
        style
      }
    >
      {label}
    </a>
  );
}
