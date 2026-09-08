"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const companies = ["FPT IS", "TRIEU HY", "StorePublish", "Hynnie"];

export default function CompanyOrbit() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const spin = useTransform(scrollYProgress, [0, 0.35, 1], [-50, 25, 410]);
  const tiltX = useTransform(scrollYProgress, [0, 0.5, 1], [14, -10, 12]);
  const tiltY = useTransform(scrollYProgress, [0, 0.5, 1], [-16, 15, -12]);

  return <div ref={ref} className="company-orbit" aria-label="Companies in my experience">
    <motion.div className="company-orbit-wheel" style={{ rotate: spin }}>
      {companies.map((company, index) => <span key={company} className={`company-orbit-label label-${index}`}><i />{company}</span>)}
    </motion.div>
    <motion.div className="company-orbit-core" style={{ rotateX: tiltX, rotateY: tiltY }}>
      <span className="company-orbit-face front">LMQ</span><span className="company-orbit-face side" /><span className="company-orbit-face top" />
    </motion.div>
    <span className="company-orbit-caption">EXPERIENCE / 04</span>
  </div>;
}
