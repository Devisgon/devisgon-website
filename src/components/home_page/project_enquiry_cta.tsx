"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./conversion_home.module.css";

export default function ProjectEnquiryCta({ label }: { label: string }) {
  const attention = useRef<Animation | null>(null);
  useEffect(() => () => attention.current?.cancel(), []);

  function drawAttention(event: MouseEvent<HTMLAnchorElement>) {
    const enquiry = document.getElementById("start-project");
    if (!enquiry) return;

    event.preventDefault();
    attention.current?.cancel();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    enquiry.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    enquiry.querySelector<HTMLElement>("button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled)")?.focus({ preventScroll: true });

    if (!reduceMotion && typeof enquiry.animate === "function") {
      attention.current = enquiry.animate(
        [0, -6, 6, -4, 4, -2, 2, 0].map((x) => ({ transform: `translateX(${x}px)` })),
        { duration: 560, easing: "ease-in-out" },
      );
    }
  }

  return <a href="#start-project" onClick={drawAttention} className={styles.primaryButton}>
    {label}<ArrowUpRight size={18} aria-hidden="true" />
  </a>;
}
