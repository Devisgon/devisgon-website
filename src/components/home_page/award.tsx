"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";

/* ------------------ Types ------------------ */

interface AwardData {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
}

/* ------------------ Data ------------------ */

const data: AwardData[] = [
  { title: "Team Members", value: 50 },
  { title: "Projects Done", value: 400, suffix: "+" },
  { title: "Awards", value: 11 },
  { title: "Projects Spends", value: 3, prefix: "$", suffix: "M" },
];

/* ------------------ Animations ------------------ */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], 
    },
  },
};

/* ------------------ Counter ------------------ */

const Counter = ({ value, prefix = "", suffix = "" }: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const pauseTime = 1500;
    const stepTime = 30;
    const increment = value / (duration / stepTime);

    let interval: ReturnType<typeof setInterval>;
    let timeout: ReturnType<typeof setTimeout>;

    const startCounting = () => {
      interval = setInterval(() => {
        start += increment;

        if (start >= value) {
          setCount(value);
          clearInterval(interval);

          timeout = setTimeout(() => {
            start = 0;
            setCount(0);
            startCounting();
          }, pauseTime);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);
    };

    startCounting();

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [value]);

  return (
    <motion.h2
      className="text-4xl font-bold text-t-primary"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {prefix}
      {count}
      {suffix}
    </motion.h2>
  );
};

/* ------------------ Awards Section ------------------ */

const Awards = () => {
  return (
    <motion.section
      className=" py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.div
        className="flex flex-wrap justify-center gap-20 text-center"
        variants={containerVariants}
      >
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center gap-4"
            variants={itemVariants}
          >
            <Counter
              value={item.value}
              prefix={item.prefix}
              suffix={item.suffix}
            />
            <p className="text-t-secondary text-2xl font-bold">
              {item.title}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Awards;
