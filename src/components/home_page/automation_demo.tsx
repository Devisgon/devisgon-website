'use client';

import { useId, useState, type CSSProperties } from 'react';
import { ArrowUpRight, GitBranch } from 'lucide-react';
import type { AutomationCopy } from '@/data/automation-examples';
import { trackHomepageEvent, type HomepageItem } from '@/lib/homepage-engagement';
import SignalRibbon from './signal_ribbon';
import styles from './automation_demo.module.css';

export default function AutomationDemo({ copy, lang = 'en' }: { copy: AutomationCopy; lang?: string }) {
  const [selected, setSelected] = useState(0);
  const [settings, setSettings] = useState(() => copy.examples.map(({ sample, threshold }) => ({ sample, threshold })));
  const example = copy.examples[selected];
  const values = settings[selected];
  const above = values.sample >= values.threshold;
  const resultId = useId();
  const format = (value: number) => example.id === 'support'
    ? new Intl.NumberFormat(lang, { style: 'unit', unit: 'hour', unitDisplay: 'short' }).format(value)
    : new Intl.NumberFormat(lang, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

  function adjust(field: 'sample' | 'threshold', value: number) {
    setSettings(previous => previous.map((item, index) => index === selected ? { ...item, [field]: value } : item));
  }

  return <div className={styles.demo} data-home-demo>
    <div className={styles.top}><GitBranch size={16}/><span>{copy.heading}</span></div>
    <div className={styles.choices} role="group" aria-label={copy.choose}>
      {copy.examples.map((item, index) => <button key={item.id} type="button" aria-pressed={index === selected} onClick={() => {
        setSelected(index);
        trackHomepageEvent('homepage_demo_select', item.id as HomepageItem);
      }}>{item.label}</button>)}
    </div>
    <div className={styles.controls}>
      {(['sample', 'threshold'] as const).map(field => <label key={field}>
        <span>{field === 'sample' ? example.measure : copy.rule}</span><strong>{format(values[field])}</strong>
        <input type="range" min={0} max={example.maximum} step={example.increment} value={values[field]}
          aria-label={field === 'sample' ? example.measure : copy.rule} aria-valuetext={format(values[field])} aria-controls={resultId}
          style={{ '--fill': `${100 * values[field] / example.maximum}%` } as CSSProperties}
          onChange={event => adjust(field, event.currentTarget.valueAsNumber)}/>
      </label>)}
    </div>
    <div className={styles.scene} data-upper={above}>
      <div className={styles.ribbon}><SignalRibbon variant={selected} tension={values.sample / example.maximum} threshold={values.threshold / example.maximum}/></div>
      <div id={resultId} role="status" aria-live="polite" className={styles.result}>
        <span>{copy.outcome} <ArrowUpRight size={13}/></span><strong>{above ? example.high : example.low}</strong>
        <p>{above ? example.highDetail : example.lowDetail}</p>
      </div>
    </div>
    <a className={styles.explore} href={example.id === 'support' ? '#capability-0' : '#capability-1'}>{copy.explore}<ArrowUpRight size={14}/></a>
  </div>;
}
