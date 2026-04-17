/* ------------------ Types ------------------ */

interface AwardData {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

/* ------------------ Data ------------------ */

const data: AwardData[] = [
  { title: "Team Members", value: 50 },
  { title: "Projects Done", value: 400, suffix: "+" },
  { title: "Awards", value: 11 },
  { title: "Projects Spends", value: 3, prefix: "$", suffix: "M" },
];

const Awards = () => {
  return (
    <section className=" py-20">
      <div className="flex flex-wrap justify-center gap-20 text-center">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-4">
            <h2 className="text-4xl font-bold text-t-primary">
              {item.prefix}
              {item.value}
              {item.suffix}
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
