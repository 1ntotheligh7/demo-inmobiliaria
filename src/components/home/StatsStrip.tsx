"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const STATS = [
  { value: 10, suffix: "+", label: "Propiedades disponibles" },
  { value: 5, suffix: "", label: "Zonas premium en Panamá" },
  { value: 15, suffix: "+", label: "Años de experiencia" },
];

function Counter({
  target,
  suffix,
  run,
}: {
  target: number;
  suffix: string;
  run: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!run) {
      setCount(target);
      return;
    }
    const start = Date.now();
    const duration = 1400;
    const id = setInterval(() => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p >= 1) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [run, target]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const shouldReduce = useReducedMotion();

  return (
    <div ref={ref} className="bg-tinta py-14">
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 text-center text-white divide-x divide-white/10">
        {STATS.map(({ value, suffix, label }) => (
          <div key={label} className="px-4 sm:px-8">
            <p className="font-serif text-display text-oro font-semibold leading-none tabular-nums">
              <Counter target={value} suffix={suffix} run={inView && !shouldReduce} />
            </p>
            <p className="text-sm text-white/60 mt-2 leading-snug">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
