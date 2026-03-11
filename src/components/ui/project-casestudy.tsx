"use client";

import { motion } from "framer-motion";

export default function ProjectCaseStudy() {
  return (
    <section id="details" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="my-20 text-center"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
          Details
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-[#6D65FF] sm:text-3xl">
          Behind the Project
        </h2>
        <p className="mx-auto mt-3 max-w-md text-xs text-muted-foreground sm:text-sm">
          A closer look at the system architecture, key challenges, and future
          improvements.
        </p>
      </motion.div>
    </section>
  );
}
