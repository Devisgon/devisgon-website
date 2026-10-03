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
  function bringAttentionToBrief(event: MouseEvent<HTMLAnchorElement>) {
    const brief = document.getElementById("industry-project-brief");
    if (!brief) return;

    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    brief.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });

    if (!reduceMotion && typeof brief.animate === "function") {
      brief.animate(
        [
          { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(187, 89, 222, 0)" },
          { transform: "scale(1.012)", boxShadow: "0 0 0 8px rgba(187, 89, 222, 0.22)" },
          { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(187, 89, 222, 0)" },
        ],
        { duration: 520, iterations: 2, easing: "ease-in-out" },
      );
    }
  }

  const style =
    variant === "hero"
      ? "bg-btn-primary text-white shadow-xl hover:-translate-y-0.5 hover:bg-[#76159A]"
      : "bg-btn-primary text-white shadow-lg hover:-translate-y-0.5 hover:bg-[#76159A]";

  return (
    <a
      href="#industry-project-brief"
      onClick={bringAttentionToBrief}
      className={
        "inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primry)] " +
        style
      }
    >
      {label}
    </a>
  );
}
