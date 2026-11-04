"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue } from "framer-motion";

type Props = {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  className?: string;
};

export function CountUp({ to, from = 0, duration = 1.6, decimals = 0, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const mv = useMotionValue(from);
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration, mv]);

  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
  return <span ref={ref} className={className}>{display}</span>;
}
