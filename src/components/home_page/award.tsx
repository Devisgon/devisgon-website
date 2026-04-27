"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

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
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  // 1. Motion value starts at 0
  const count = useMotionValue(0);
  // 2. Round the value to avoid decimals
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      // 3. High-performance animation outside React's render loop
      const controls = animate(count, value, {
        duration: 1.5,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, count, value]);

  return (
    <span ref={ref} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      {/* We use a motion.span for the animated number. 
         The actual text content is driven by the motion value.
      */}
      <motion.span>{rounded}</motion.span>
      {suffix}
      
      {/* SEO Fallback: Hidden but readable by bots */}
      <span className="sr-only">{value}</span>
    </span>
  );
};

const Awards = () => {
  return (
    <section className="py-20">
      <div className="flex flex-wrap justify-center gap-20 text-center">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-4">
            <h2 className="text-4xl font-bold text-t-primary">
              <Counter 
                value={item.value} 
                prefix={item.prefix} 
                suffix={item.suffix} 
              />
            </h2>
            <p className="text-t-secondary text-2xl font-bold">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Awards;