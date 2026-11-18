import { useId } from "react";

// A twisted strip of parallel filaments. Each scene uses the same construction.
export default function SignalRibbon({ variant = 0, tension = .5, threshold = .5 }: { variant?: number; tension?: number; threshold?: number }) {
  const gradient = useId();
  return <svg viewBox="0 0 600 165" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <defs><linearGradient id={gradient} x1="0%" y1="15%" x2="100%" y2="65%">
      <stop stopColor="#56e5dd"/><stop offset=".22" stopColor="#8a96ff"/>
      <stop offset=".45" stopColor="#e38dff"/><stop offset=".7" stopColor="#ff70ab"/>
      <stop offset=".87" stopColor="#ffa273"/><stop offset="1" stopColor="#ffe79c"/>
    </linearGradient></defs>
    <g fill="none" stroke={`url(#${gradient})`} strokeWidth="1.25">
      {Array.from({ length: 38 }, (_, i) => {
        const t = i / 37;
        const spread = (55 + tension * 90) * t;
        const shift = variant * 12 + (threshold - .5) * 86;
        const d = `M -40 ${95 + spread * .42} C 38 ${110 - spread}, 75 ${-42 + spread}, 160 ${50 + spread * .55} S 268 ${193 - spread}, 330 ${78 - spread * .23} S 396 ${-34 + spread + shift}, 461 ${46 + spread * .74} S 555 ${156 - spread + shift}, 644 ${59 - spread * .43}`;
        return <path key={i} d={d}/>;
      })}
    </g>
  </svg>;
}
