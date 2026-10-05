"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}

export default function FadeInView({
  children,
  delay = 0,
  className,
  direction = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const shouldReduce = useReducedMotion();

  const d = 22;
  const hidden = {
    opacity: 0,
    y: direction === "up" ? d : 0,
    x: direction === "left" ? -d : direction === "right" ? d : 0,
  };
  const visible = { opacity: 1, y: 0, x: 0 };

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : hidden}
      animate={shouldReduce ? visible : inView ? visible : hidden}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
