"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, HelpCircle, TrendingDown } from "lucide-react";
type ProblemMetric = {
  icon?: "clock" | "trending-down";
  title: string;
  value: string;
  subtitle?: string;
  description?: string;
};

type WhyBuiltSectionProps = {
  problem?: string[] | null;
  problem_intro?: string | null;
  problem_metrics?: ProblemMetric[] | null;
};

export default function WhyBuiltSection({
  problem,
  problem_intro,
  problem_metrics,
}: WhyBuiltSectionProps) {
  if (!problem && !problem_intro && !problem_metrics) return null;

  const introItems = problem ?? [];
  const metrics = problem_metrics ?? [];

  const topAdvantages = introItems.slice(0, 3);
  const bottomAdvantages = introItems.slice(3, 5);

  const firstMetric = metrics[0];
  const secondMetric = metrics[1];

  return (
    <div className="mx-auto max-w-6xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-[24px] bg-[#F7F6ff] px-4 py-6 sm:rounded-[30px] sm:px-8 sm:py-10"
      >
        {/* top problem */}
        <div className="grid gap-4 lg:grid-cols-[90px_1fr]">
          <div className="flex justify-center lg:hidden">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_12px_30px_rgba(109,101,255,0.10)]">
              <HelpCircle
                className="h-7 w-7 text-[#B987FC]"
                strokeWidth={1.8}
              />
            </div>
          </div>

          <div className="hidden items-start justify-center lg:flex">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-[0_12px_30px_rgba(109,101,255,0.10)]">
              <HelpCircle
                className="h-12 w-12 text-[#6D65FF]"
                strokeWidth={1.8}
              />
            </div>
          </div>

          <div>
            <p className="text-center text-[14px] leading-6 text-gray-700 sm:text-[16px] lg:text-left">
              {problem_intro}
            </p>
          </div>
        </div>

        {/* cards grid */}
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-[1.25fr_0.95fr]">
          {/* top left white list card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex h-full items-center justify-center rounded-[20px] bg-white px-5 py-5 shadow-[0_14px_35px_rgba(109,101,255,0.08)] sm:rounded-[24px] sm:px-6 sm:py-6"
          >
            <ul className="space-y-3 sm:space-y-4">
              {topAdvantages.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle
                    className="mt-1 h-5 w-5 shrink-0 text-[#6D65FF]"
                    strokeWidth={2}
                  />
                  <span className="text-[15px] text-gray-700 sm:text-[16px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* top right metric */}
          {firstMetric && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-[20px] bg-gradient-to-r from-[#6D65FF] to-[#8C84FF] px-5 py-5 text-white shadow-[0_14px_35px_rgba(185,135,252,0.28)] sm:rounded-[24px] sm:px-6 sm:py-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center justify-center">
                  {firstMetric.icon === "clock" ? (
                    <Clock
                      className="h-12 w-12 text-white sm:h-16 sm:w-16"
                      strokeWidth={2}
                    />
                  ) : (
                    <TrendingDown
                      className="h-12 w-12 text-white sm:h-16 sm:w-16"
                      strokeWidth={2}
                    />
                  )}
                </div>

                <div className="text-right">
                  <div className="text-[16px] font-semibold text-white sm:text-[18px]">
                    {firstMetric.title}
                  </div>

                  <div className="mt-1 text-[32px] font-bold leading-none tracking-tight text-white sm:text-[40px]">
                    {firstMetric.value}
                  </div>
                </div>
              </div>

              {firstMetric.subtitle && (
                <div className="mt-5 text-[24px] font-semibold sm:mt-7 sm:text-[28px]">
                  {firstMetric.subtitle}
                </div>
              )}

              {firstMetric.description && (
                <div className="text-[17px] font-medium text-white/90 sm:text-[20px]">
                  {firstMetric.description}
                </div>
              )}
            </motion.div>
          )}

          {/* bottom left metric */}
          {secondMetric && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex min-h-[170px] flex-col justify-center rounded-[20px] bg-gradient-to-br from-[#B987FC] to-[#9D70F4] px-5 py-5 text-white shadow-[0_14px_35px_rgba(185,135,252,0.28)] sm:min-h-[190px] sm:rounded-[24px] sm:px-6 sm:py-6"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="text-[32px] font-bold leading-none sm:text-[38px]">
                  {secondMetric.value}
                </div>

                {secondMetric.icon === "trending-down" ? (
                  <TrendingDown
                    className="h-12 w-12 shrink-0 text-white sm:h-16 sm:w-16"
                    strokeWidth={2.2}
                  />
                ) : (
                  <Clock
                    className="h-12 w-12 shrink-0 text-white sm:h-16 sm:w-16"
                    strokeWidth={2.2}
                  />
                )}
              </div>

              <div className="text-[16px] font-semibold sm:text-[18px]">
                {secondMetric.title}
              </div>

              {secondMetric.description && (
                <div className="mt-2 text-[15px] font-medium text-white/90 sm:mt-3 sm:text-[16px]">
                  {secondMetric.description}
                </div>
              )}
            </motion.div>
          )}

          {/* bottom right white list card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex min-h-[170px] flex-col justify-center rounded-[20px] bg-white px-5 py-5 shadow-[0_14px_35px_rgba(109,101,255,0.08)] sm:min-h-[190px] sm:rounded-[24px] sm:px-6 sm:py-6"
          >
            <ul className="space-y-3 sm:space-y-4">
              {bottomAdvantages.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle
                    className="mt-1 h-5 w-5 shrink-0 text-[#6D65FF]"
                    strokeWidth={2}
                  />
                  <span className="text-[15px] leading-6 text-gray-700 sm:text-[16px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
