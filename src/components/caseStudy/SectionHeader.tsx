"use client";

import { motion } from "framer-motion";

type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  className?: string;
};

export default function SectionHeader({
  label,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`mb-6 text-center sm:mb-12 ${className}`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
        {label}
      </p>

      <h3 className="mx-2 mt-2 text-2xl font-semibold text-[#6D65FF] sm:text-3xl">
        {title}
      </h3>

      {description ? (
        <p className="mx-auto mt-3 max-w-md text-xs text-muted-foreground sm:text-sm">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
