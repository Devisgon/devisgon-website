"use client";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
  type AnimationPlaybackControls,
} from "framer-motion";

interface AwardData {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

const data: AwardData[] = [
  { title: "Team Members", value: 50 },
  { title: "Projects Done", value: 400, suffix: "+" },
  { title: "Awards", value: 11 },
  { title: "Projects Spends", value: 3, prefix: "$", suffix: "M" },
];

const Counter = ({ value, prefix, suffix }: { value: number; prefix?: string; suffix?: string }) => {
  const ref = useRef(null);
  // once: false allows the animation to re-trigger if you scroll away and back
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    let controls: AnimationPlaybackControls | undefined;

    if (isInView) {
      // Animation  triggers an infinite loop while in view
      controls = animate(count, value, {
        duration: 2,      // Time to reach the target number
        ease: "easeOut", 
        repeat: Infinity,  // Loop forever
        repeatType: "loop", // Reset to 0 after reaching the target
        repeatDelay: 2,    // Pause for 2 seconds at the end so people can read the total
      });
    } else {
      // If the section is not in view, stop animation and reset to 0
      if (controls) controls.stop();
      count.set(0);
    }

    return () => controls?.stop();
  }, [isInView, count, value]);

  return (
    <span ref={ref} className="tabular-nums" aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
      {/* Screen reader fallback */}
      <span className="sr-only">{value}</span>
    </span>
  );
};

const Awards = () => {
  return (
    <section className="py-20 bg-white dark:bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24 text-center">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-6 min-w-[150px]">
              <h4 className="text-4xl md:text-5xl font-bold text-t-primary">
                <Counter 
                  value={item.value} 
                  prefix={item.prefix} 
                  suffix={item.suffix} 
                />
              </h4>
              <p className="text-t-secondary text-lg md:text-xl font-semibold uppercase tracking-wide">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
