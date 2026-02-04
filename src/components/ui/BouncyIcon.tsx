"use client";

import { motion, useReducedMotion } from "framer-motion";
import type React from "react";

export default function BouncyIcon({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <span className="inline-flex">{children}</span>;

  return (
    <motion.span
      className="inline-flex"
      animate={{ y: [0, -2, 0] }}
      transition={{
        duration: 1.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.span>
  );
}
