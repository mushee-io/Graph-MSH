"use client";
import { motion } from "framer-motion";

function Orb({ className, delay }: { className: string; delay: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay }}
    />
  );
}

export function Floaters() {
  return (
    <>
      <Orb className="orb one animate-floaty" delay={0.05} />
      <Orb className="orb two animate-floaty2" delay={0.15} />
      <Orb className="orb three animate-floaty" delay={0.25} />
    </>
  );
}
