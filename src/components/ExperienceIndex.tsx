"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ExperienceIndex({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.7 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const startedAt = performance.now();
    let frame = 0;
    const update = (now: number) => {
      const progress = Math.min((now - startedAt) / 700, 1);
      setCount(Math.round((1 - Math.pow(1 - progress, 3)) * value));
      if (progress < 1) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [visible, value]);

  return <div ref={ref} className="experience-index" aria-label={`Experience ${value}`}>{String(count).padStart(2, "0")}</div>;
}
