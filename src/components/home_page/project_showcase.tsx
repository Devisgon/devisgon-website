'use client';

import { Children, useState, type ReactNode } from 'react';
import { ArrowDownRight } from 'lucide-react';
import flow from './flow.module.css';
import styles from './conversion_home.module.css';

export default function ProjectShowcase({ names, label, routes, children }: { names: string[]; label: string; routes: { href: string; label: string }[]; children: ReactNode }) {
  const [active, setActive] = useState(0);
  return <div className={styles.showcase}>
    <div role="group" aria-label={label} className={styles.projectPicker}>
      {names.map((name, index) => <button type="button" key={name} aria-pressed={active === index}
        onClick={() => setActive(index)}>{name}<ArrowDownRight size={17} aria-hidden="true"/></button>)}
    </div>
    {Children.map(children, (child, index) => <div hidden={index !== active} className={styles.projectPanel}>{child}</div>)}
    <a className={flow.branchLink} href={routes[active].href}>{routes[active].label}<ArrowDownRight size={18} aria-hidden="true" /></a>
  </div>;
}
