'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './flow.module.css';

type Stage = { id: string; label: string };

export default function FlowRoute({ stages, label }: { stages: Stage[]; label: string }) {
  const [current, setCurrent] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = svgRef.current;
    const page = svg?.parentElement;
    if (!svg || !page) return;
    const stops = Array.from(page.querySelectorAll<HTMLElement>('[data-flow-stop]'));
    const paths = svg.querySelectorAll('path');
    const progress = paths[1];
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let height = 1;
    let origin = 0;
    let active = -1;
    let lengths: number[] = [];
    let positions: number[] = [];
    function paint() {
      frame = 0;
      const position = window.scrollY + innerHeight * .55 - origin;
      const sample = lengths.findIndex(y => y >= position);
      let fraction = 1;
      if (sample === 0) fraction = 0;
      if (sample > 0) {
        const from = lengths[sample - 1];
        fraction = (sample - 1 + (position - from) / Math.max(1, lengths[sample] - from)) / (lengths.length - 1);
      }
      progress.style.strokeDashoffset = motion.matches ? '0' : String(1 - fraction);
      const next = positions.filter(y => y <= position).length - 1;
      if (next !== active) {
        stops[active]?.removeAttribute('data-current');
        stops[next]?.setAttribute('data-current', '');
        active = next;
        setCurrent(Math.max(0, next));
      }
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(paint);
    }
    function measure() {
      if (!page || !svg) return;
      const rect = page.getBoundingClientRect();
      origin = rect.top + window.scrollY;
      height = rect.height;
      const gutter = Math.min(56, rect.width * .044);
      positions = stops.map(stop => stop.getBoundingClientRect().top - rect.top);
      let x = gutter;
      let route = 'M ' + x + ' ' + positions[0];
      for (const y of positions.slice(1).filter((y, i) => y - positions[i] > 64)) {
        const next = x === gutter ? rect.width - gutter : gutter;
        const direction = next > x ? 1 : -1;
        const bend = Math.min(32, gutter);
        // Cross the spread inside its empty seam, then descend on the other edge.
        route += ' V ' + (y - bend) + ' q 0 ' + bend + ' ' + direction * bend + ' ' + bend +
          ' H ' + (next - direction * bend) + ' q ' + direction * bend + ' 0 ' + direction * bend + ' ' + bend;
        x = next;
      }
      route += ' V ' + height;
      paths.forEach(path => path.setAttribute('d', route));
      const total = progress.getTotalLength();
      lengths = Array.from({ length: 257 }, (_, i) => progress.getPointAtLength(total * i / 256).y);
      schedule();
    }
    const observer = new ResizeObserver(measure);
    [page, ...stops].forEach(stop => observer.observe(stop));
    // Pointer movement tilts the sculpture within the hero only.
    const hero = stops[0];
    function tilt(e: PointerEvent) {
      if (motion.matches || e.pointerType !== 'mouse') return;
      const bounds = hero.getBoundingClientRect();
      hero.style.setProperty('--tilt', ((e.clientX - bounds.left) / bounds.width * 12 - 6) + 'deg');
    }
    function reset() { hero.style.removeProperty('--tilt'); }
    hero.addEventListener('pointermove', tilt);
    hero.addEventListener('pointerleave', reset);
    window.addEventListener('scroll', schedule, { passive: true });
    motion.addEventListener('change', schedule);
    measure();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      hero.removeEventListener('pointermove', tilt);
      hero.removeEventListener('pointerleave', reset);
      motion.removeEventListener('change', schedule);
    };
  }, []);
  return <>
    <nav aria-label={label} className={styles.map}>
      {stages.map((stage, index) => <a key={stage.id} href={`#${stage.id}`} aria-label={stage.label} aria-current={current === index ? "location" : undefined}>
        <span aria-hidden="true" /><b>{stage.label}</b>
      </a>)}
    </nav>
    <svg ref={svgRef} className={styles.route} aria-hidden="true" focusable="false">
    <path className={styles.track} /><path className={styles.current} pathLength="1" />
  </svg>
  </>;
}
