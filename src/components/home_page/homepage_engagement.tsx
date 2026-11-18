'use client';
import { useEffect } from 'react';
import { trackHomepageEvent, type HomepageItem } from '@/lib/homepage-engagement';
export default function HomepageEngagement() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const seen = new Set<string>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const name = entry.target.getAttribute('data-home-section');
        if (entry.isIntersecting && name && !seen.has(name)) {
          seen.add(name); trackHomepageEvent('homepage_section_view', name as HomepageItem); observer.unobserve(entry.target);
        }
      }
    }, { threshold: .5 });
    document.querySelectorAll('[data-home-section]').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}
