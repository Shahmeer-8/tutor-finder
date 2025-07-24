import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

function AnimatedCounter({ value, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, value, duration]);

  return <span ref={ref}>{count}</span>;
}

function StatCard({ stat, index, isVisible }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative flex flex-col items-center text-center p-6 transition-all duration-300 hover:translate-x-1 hover:translate-y-1"
    >
      {/* Hover outline effect */}
      <div className="absolute inset-0 border-2 border-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg translate-x-2 translate-y-2 -z-10" />

      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 font-primary">
        <AnimatedCounter value={stat.value} />
        <span style={{ color: stat.suffixColor }}>{stat.suffix}</span>
      </div>
      <p className="text-gray-300 text-sm md:text-base font-secondary">
        {stat.label}
      </p>
    </motion.div>
  );
}

export function Stats() {
  const statsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { value: 12, suffix: "K", label: "Students", suffixColor: "#e2f047" },
    { value: 70, suffix: "+", label: "Tutors", suffixColor: "#e2f047" },
    { value: 50, suffix: "+", label: "Subjects", suffixColor: "#e2f047" },
    { value: 100, suffix: "%", label: "Satisfaction", suffixColor: "#e2f047" },
    {
      value: 24 / 7,
      suffix: "K",
      label: "Availability",
      suffixColor: "#e2f047",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex  flex-col items-center justify-center bg-deep p-10 md:p-20">
      <h1 className="font-primary text-white text-4xl md:text-5xl font-bold mb-10" >Your Success is Our Story</h1>
      <div
        ref={statsRef}
        className="w-full max-w-6xl rounded-2xl p-6 sm:p-8 md:p-10 bg-[#1a2557] shadow-custom"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-4">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </div>
  );
}
