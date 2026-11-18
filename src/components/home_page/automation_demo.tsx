'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Bot, Check, FileText, Inbox, MessageSquare, Pause, Play, RotateCcw, Workflow } from 'lucide-react';
import type { AutomationCopy } from '@/data/automation-examples';
import { trackHomepageEvent, type HomepageItem } from '@/lib/homepage-engagement';
import styles from './automation_demo.module.css';

export default function AutomationDemo({ copy }: { copy: AutomationCopy }) {
  const [selected, setSelected] = useState(0);
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const container = useRef<HTMLDivElement>(null);
  const autoStarted = useRef(false);
  const interacted = useRef(false);
  const example = copy.examples[selected];
  const done = step === 3;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setReduced(preference.matches);
      if (preference.matches) { setPlaying(false); setStep(-1); }
    };
    sync(); preference.addEventListener('change', sync);
    const visibility = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener('visibilitychange', visibility);
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (!entry.isIntersecting) setPlaying(false);
      if (entry.isIntersecting && !autoStarted.current && !interacted.current && !preference.matches && !document.hidden) {
        autoStarted.current = true; setStep(0); setPlaying(true);
      }
    }, { threshold: .5 });
    if (container.current) observer?.observe(container.current);
    return () => { preference.removeEventListener('change', sync); observer?.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  useEffect(() => {
    if (!playing || !visible || reduced) return;
    const timer = window.setTimeout(() => {
      if (step >= 2) { setStep(3); setPlaying(false); }
      else setStep(step + 1);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [playing, visible, reduced, step]);

  function choose(index: number) {
    interacted.current = true; setSelected(index); setStep(-1); setPlaying(false);
    trackHomepageEvent('homepage_demo_select', copy.examples[index].id as HomepageItem);
  }
  function run() {
    interacted.current = true;
    if (playing) { setPlaying(false); return; }
    trackHomepageEvent('homepage_demo_run', example.id as HomepageItem);
    if (reduced) { setStep(3); return; }
    if (step < 0 || done) setStep(0);
    setPlaying(true);
  }
  const icons = [selected === 1 ? FileText : selected === 2 ? MessageSquare : Inbox, Bot, Check];
  const Control = playing ? Pause : done ? RotateCcw : Play;
  const controlLabel = playing ? copy.pause : done ? copy.replay : step >= 0 ? copy.resume : copy.run;
  return <div ref={container} className={styles.demo} data-home-demo data-playing={playing}>
    <div className={styles.top}><span><Workflow size={14} aria-hidden="true" />{copy.heading}</span><small>{copy.label}</small></div>
    <div className={styles.choices} role="group" aria-label={copy.choose}>
      {copy.examples.map((item, index) => <button key={item.id} type="button" aria-pressed={selected === index} onClick={() => choose(index)}>{item.label}</button>)}
    </div>
    <ol className={styles.flow}>
      {example.nodes.map((node, index) => {
        const Icon = icons[index];
        return <li key={`${example.id}-${index}`} data-active={step === index} data-complete={step > index}>
          <div className={styles.nodeIcon}><Icon size={21} strokeWidth={1.6} aria-hidden="true" /></div>
          <span className={styles.stage}>{copy.stages[index]}</span><strong>{node}</strong>
          {index < 2 && <span className={styles.connector} aria-hidden="true"><i /><ArrowRight size={13} /></span>}
        </li>;
      })}
    </ol>
    <div className={styles.bottom}>
      <p role="status" aria-live={interacted.current ? 'polite' : 'off'}>{done ? example.result : playing ? copy.running : step >= 0 ? copy.paused : reduced ? copy.reduced : copy.ready}</p>
      <button type="button" onClick={run}><Control size={13} aria-hidden="true" />{controlLabel}</button>
    </div>
  </div>;
}
