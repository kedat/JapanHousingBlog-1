import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  {
    value: 250,
    label: "Blog Posts",
    suffix: "+"
  },
  {
    value: 45,
    label: "Cities Covered",
    suffix: "+"
  },
  {
    value: 1,
    label: "Monthly Readers",
    suffix: "M+"
  }
];

const KeyStatsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  return (
    <section className="py-16 px-6 bg-primary text-white">
      <div className="container">
        <div 
          ref={ref} 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          {stats.map((stat, index) => (
            <div key={index} className="p-6">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {inView ? (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    separator=","
                    suffix={stat.suffix}
                  />
                ) : (
                  "0"
                )}
              </div>
              <div className="text-lg text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyStatsSection;