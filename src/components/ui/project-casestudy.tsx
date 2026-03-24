"use client";

import { ProblemMetric } from "@/db/schema";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import DetailSection from "./DetailSection";
import ForgeSection from "./ForgeSection";
import FutureImprovementsSection from "./FutureImprovementsSection";
import WhyBuiltSection from "./WhyBuiltSection";

type ProjectArchitecture = {
  frontend: string[];
  api: string[];
  database: string[];
  platform: string[];
};

type ProjectImprovement = {
  title: string;
  description: string;
};

type ProjectCaseStudyProps = {
  title?: string;
  architecture?: ProjectArchitecture | null;
  improvements?: ProjectImprovement[] | null;

  problem?: string[] | null;
  problem_intro?: string | null;
  problem_metrics?: ProblemMetric[] | null;
};

export default function ProjectCaseStudy({
  title,
  architecture,
  improvements,
  problem,
  problem_intro,
  problem_metrics,
}: ProjectCaseStudyProps) {
  const [openUserFlow, setOpenUserFlow] = useState(false);

  if (!architecture && !improvements?.length) return null;

  return (
    <>
      <section id="details" className="scroll-mt-24">
        <div className="mx-auto my-20 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[#6D65FF]/30 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center sm:mb-20"
        >
          <h3 className="text-2xl font-semibold text-[#6D65FF] sm:text-3xl">
            Why This System Was Built
          </h3>
        </motion.div>

        <WhyBuiltSection
          problem={problem}
          problem_intro={problem_intro}
          problem_metrics={problem_metrics}
        />

        {!!architecture && (
          <>
            <div className="mx-auto my-20 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[#6D65FF]/30 to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-10 text-center sm:mb-20"
            >
              <h3 className="text-2xl font-semibold text-[#6D65FF] sm:text-3xl">
                System Architecture
              </h3>
            </motion.div>

            <DetailSection architecture={architecture} />
          </>
        )}

        {/* NEED TO DELETE  */}
        {title === "Forge" && (
          <div className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
            <div className="mx-auto my-20 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[#6D65FF]/30 to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-10 text-center sm:mb-20"
            >
              <h3 className="text-2xl font-semibold text-[#6D65FF] sm:text-3xl">
                Competitive Analysis
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="group relative overflow-hidden rounded-[24px] border border-[#6D65FF]/15 bg-white shadow-[0_16px_40px_rgba(109,101,255,0.08)]"
            >
              <ForgeSection />
            </motion.div>
            <div className="mx-auto my-20 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[#6D65FF]/30 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-10 text-center sm:mb-20"
            >
              <h3 className="text-2xl font-semibold text-[#6D65FF] sm:text-3xl">
                Design System
              </h3>
            </motion.div>
            <div className="grid gap-5">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45 }}
                className="overflow-hidden rounded-[24px] border border-[#6D65FF]/15 bg-white shadow-[0_16px_40px_rgba(109,101,255,0.08)]"
              >
                <Image
                  src="/images/styleGuide.png"
                  alt="Forge Style"
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover p-7"
                />
              </motion.div>
              <div className="mx-auto my-20 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[#6D65FF]/30 to-transparent" />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="mb-10 text-center sm:mb-20"
              >
                <h3 className="text-2xl font-semibold text-[#6D65FF] sm:text-3xl">
                  User Persona
                </h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="group relative overflow-hidden rounded-[24px] border border-[#6D65FF]/15 bg-white shadow-[0_16px_40px_rgba(109,101,255,0.08)]"
              >
                <Image
                  src="/images/forge/user.png"
                  alt="Forge User"
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </motion.div>

              <div className="mx-auto my-20 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[#6D65FF]/30 to-transparent" />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="mb-10 text-center sm:mb-20"
              >
                <h3 className="text-2xl font-semibold text-[#6D65FF] sm:text-3xl">
                  User Flow
                </h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="group relative overflow-hidden rounded-[24px] border border-[#6D65FF]/15 bg-white shadow-[0_16px_40px_rgba(109,101,255,0.08)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenUserFlow(true)}
                  className="block w-full cursor-zoom-in"
                >
                  <Image
                    src="/images/userFlow.png"
                    alt="Forge UserFlow"
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition group-hover:opacity-100">
                    <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-800 shadow-md">
                      <Search className="h-4 w-4" />
                      Click the image to expand
                    </div>
                  </div>
                </button>
              </motion.div>

              <div className="mx-auto my-20 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[#6D65FF]/30 to-transparent" />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="mb-10 text-center sm:mb-20"
              >
                <h3 className="text-2xl font-semibold text-[#6D65FF] sm:text-3xl">
                  High-Fidelity Design
                </h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="group relative overflow-hidden rounded-[24px] border border-[#6D65FF]/15 bg-white shadow-[0_16px_40px_rgba(109,101,255,0.08)]"
              >
                <Image
                  src="/images/forge/HighFi.png"
                  alt="Forge Highfi"
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        )}

        {!!improvements?.length && (
          <>
            <div className="mx-auto my-20 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[#6D65FF]/30 to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-10 text-center sm:mb-20"
            >
              <h3 className="text-2xl font-semibold text-[#6D65FF] sm:text-3xl">
                Future Improvements
              </h3>
            </motion.div>

            <FutureImprovementsSection improvements={improvements} />

            <div className="mx-auto my-20 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[#6D65FF]/30 to-transparent" />
          </>
        )}
      </section>

      {openUserFlow && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpenUserFlow(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-6xl overflow-auto rounded-2xl bg-white p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenUserFlow(false)}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/70 px-3 py-1 text-sm text-white cursor-pointer"
            >
              Close
            </button>

            <Image
              src="/images/userFlow.png"
              alt="Forge UserFlow Large"
              width={2200}
              height={1600}
              className="h-auto w-full rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
