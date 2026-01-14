"use client";
import  { useEffect, useState } from "react";

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

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
}

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
    <h2 className="text-4xl font-bold text-primary">
      {prefix}
      {count}
      {suffix}
    </h2>
  );
};

const Awards = () => {
  return (
    <section className="bg-bg-secondary py-20">
      <div className="flex flex-wrap justify-center gap-20 text-center">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-4">
            <Counter
              value={item.value}
              prefix={item.prefix}
              suffix={item.suffix}
            />
            <p className="text-secondary text-2xl font-bold">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Awards;
