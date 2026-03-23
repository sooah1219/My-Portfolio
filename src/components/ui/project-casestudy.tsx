"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  CalendarClock,
  CheckCircle,
  Clock,
  CreditCard,
  Database,
  HelpCircle,
  LayoutDashboard,
  Monitor,
  Smartphone,
  TrendingDown,
} from "lucide-react";
import Image from "next/image";

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
  architecture?: ProjectArchitecture | null;
  improvements?: ProjectImprovement[] | null;
};

function DetailSection({
  architecture,
}: {
  architecture?: ProjectArchitecture | null;
}) {
  if (!architecture) return null;

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="relative">
        <div className="grid gap-6 sm:gap-15 lg:grid-cols-[1fr_1fr_1fr]">
          {/* Frontend */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="relative h-fit rounded-[28px] border border-[#6D65FF]/25 bg-white shadow-[0_16px_40px_rgba(109,101,255,0.12)]"
          >
            <div className="rounded-t-[28px] bg-gradient-to-r from-[#6D65FF] to-[#8C84FF] px-6 py-4 text-center">
              <h3 className="text-xl font-semibold text-white">Frontend</h3>
            </div>

            <div className="p-6">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F7F6FF]">
                  <Monitor
                    className="h-9 w-9 text-[#6D65FF]"
                    strokeWidth={1.8}
                  />
                </div>
              </div>

              <ul className="space-y-4 text-[15px] text-slate-700">
                {architecture.frontend?.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#6D65FF]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="absolute -right-25 top-1/3 z-10 hidden -translate-y-1/2 lg:flex">
              <div className="flex items-center rounded-lg bg-[#B987FC] px-4 py-2 text-sm font-medium text-white shadow-lg">
                User Actions
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </motion.div>

          {/* API Layer */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="relative h-fit rounded-[28px] border border-[#6D65FF]/12 shadow-[0_16px_40px_rgba(109,101,255,0.08)]"
          >
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold text-[#6D65FF]">
                API Layer
              </h3>
            </div>

            <div className="px-6 pb-7">
              <div className="mb-6 flex justify-center">
                <div className="flex h-[130px] w-[190px] items-center justify-center">
                  <Image
                    src="/images/api.png"
                    alt="API preview"
                    width={130}
                    height={190}
                    className="h-[130px] w-[150px] object-contain"
                  />
                </div>
              </div>

              <ul className="space-y-4 text-[15px] text-slate-700">
                {architecture.api?.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#6D65FF]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="absolute -right-25 top-1/3 hidden -translate-y-1/2 lg:flex">
              <div className="flex items-center rounded-lg bg-[#B987FC] px-4 py-2 text-sm font-medium text-white shadow-lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                API Req &amp; Res
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <div className="grid gap-6 sm:gap-12">
            {/* Database */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="rounded-[28px] border border-[#6D65FF]/25 bg-white shadow-[0_16px_40px_rgba(109,101,255,0.12)]"
            >
              <div className="rounded-t-[28px] bg-gradient-to-r from-[#6D65FF] to-[#8C84FF] px-6 py-4 text-center">
                <h3 className="text-xl font-semibold text-white">Database</h3>
              </div>

              <div className="px-6 pb-7 pt-6">
                <div className="mb-5 flex items-center justify-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F7F6FF]">
                    <Database
                      className="h-9 w-9 text-[#6D65FF]"
                      strokeWidth={1.8}
                    />
                  </div>
                </div>

                <ul className="space-y-4 text-[15px] text-slate-700">
                  {architecture.database?.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#6D65FF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Platform */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: 0.24 }}
              className="rounded-[28px] border border-[#6D65FF]/25 bg-white shadow-[0_16px_40px_rgba(109,101,255,0.12)]"
            >
              <div className="rounded-t-[28px] bg-gradient-to-r from-[#6D65FF] to-[#8C84FF] px-6 py-4 text-center">
                <h3 className="text-xl font-semibold text-white">Platform</h3>
              </div>

              <div className="px-6 pb-7 pt-6">
                <div className="mb-5 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F7F6FF]">
                    <LayoutDashboard
                      className="h-9 w-9 text-[#6D65FF]"
                      strokeWidth={1.8}
                    />
                  </div>
                </div>

                <ul className="space-y-4 text-[15px] text-slate-700">
                  {architecture.platform?.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#6D65FF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 lg:hidden">
          <div className="rounded-2xl border border-[#6D65FF]/15 bg-[#F7F6FF] p-4 text-sm text-slate-700">
            <div className="mb-2 flex items-center gap-2 font-semibold text-[#554BD4]">
              <Smartphone className="h-4 w-4" />
              Flow
            </div>
            Frontend → API Layer → Database / Platform
          </div>
        </div>
      </div>
    </div>
  );
}

function WhyBuiltSection() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-[24px] bg-[#F7F6ff] px-4 py-6 sm:rounded-[30px] sm:px-8 sm:py-10"
      >
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
            <p className="text-center lg:text-left text-[14px] leading-6 text-gray-700 sm:text-[16px]">
              Vendor ordering depended on manually remembering schedules and
              sending daily messages. As vendors increased, the workflow became
              time-consuming, error-prone, and difficult to manage financially.
              No centralized system existed to manage schedules, orders, and
              costs in one place.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-[1.25fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="rounded-[20px] bg-white px-5 py-5 shadow-[0_14px_35px_rgba(109,101,255,0.08)] sm:rounded-[24px] sm:px-6 sm:py-6"
          >
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle
                  className="mt-1 h-5 w-5 shrink-0 text-[#6D65FF]"
                  strokeWidth={2}
                />
                <span className="text-[15px] text-gray-700 sm:text-[16px]">
                  Centralized vendor dashboard to manage all suppliers in one
                  place
                </span>
              </li>

              <li className="flex items-start gap-3">
                <CheckCircle
                  className="mt-1 h-5 w-5 shrink-0 text-[#6D65FF]"
                  strokeWidth={2}
                />
                <span className="text-[15px] text-gray-700 sm:text-[16px]">
                  Create orders quickly by selecting quantities from one list
                </span>
              </li>

              <li className="flex items-start gap-3">
                <CheckCircle
                  className="mt-1 h-5 w-5 shrink-0 text-[#6D65FF]"
                  strokeWidth={2}
                />
                <span className="text-[15px] text-gray-700 sm:text-[16px]">
                  Reduce repetitive typing and item-checking time
                </span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-[20px] bg-gradient-to-r from-[#6D65FF] to-[#8C84FF] px-5 py-5 text-white shadow-[0_14px_35px_rgba(185,135,252,0.28)] sm:rounded-[24px] sm:px-6 sm:py-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center justify-center">
                <Clock
                  className="h-12 w-12 text-white sm:h-16 sm:w-16"
                  strokeWidth={2}
                />
              </div>

              <div className="text-right">
                <div className="text-[16px] font-semibold text-white sm:text-[18px]">
                  Time saved daily
                </div>

                <div className="mt-1 text-[32px] font-bold leading-none tracking-tight text-white sm:text-[40px]">
                  70 – 80%
                </div>
              </div>
            </div>

            <div className="mt-5 text-[24px] font-semibold sm:mt-7 sm:text-[28px]">
              ~3hrs/week
            </div>
            <div className="text-[17px] font-medium text-white/90 sm:text-[20px]">
              Operations Reduced
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex min-h-[170px] flex-col justify-center rounded-[20px] bg-gradient-to-br from-[#B987FC] to-[#9D70F4] px-5 py-5 text-white shadow-[0_14px_35px_rgba(185,135,252,0.28)] sm:min-h-[190px] sm:rounded-[24px] sm:px-6 sm:py-6"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="text-[32px] font-bold leading-none sm:text-[38px]">
                50% +
              </div>

              <TrendingDown
                className="h-12 w-12 shrink-0 text-white sm:h-16 sm:w-16"
                strokeWidth={2.2}
              />
            </div>

            <div className="text-[16px] font-semibold sm:text-[18px]">
              Order Errors Decreased
            </div>

            <div className="mt-2 text-[15px] font-medium text-white/90 sm:mt-3 sm:text-[16px]">
              Prevent order missing
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex min-h-[170px] flex-col justify-center rounded-[20px] bg-white px-5 py-5 shadow-[0_14px_35px_rgba(109,101,255,0.08)] sm:min-h-[190px] sm:rounded-[24px] sm:px-6 sm:py-6"
          >
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle
                  className="mt-1 h-5 w-5 shrink-0 text-[#6D65FF]"
                  strokeWidth={2}
                />
                <span className="text-[15px] leading-6 text-gray-700 sm:text-[16px]">
                  Day-based filtering to instantly see which vendors need orders
                </span>
              </li>

              <li className="flex items-start gap-3">
                <CheckCircle
                  className="mt-1 h-5 w-5 shrink-0 text-[#6D65FF]"
                  strokeWidth={2}
                />
                <span className="text-[15px] leading-6 text-gray-700 sm:text-[16px]">
                  Real-time visibility into total order cost
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function FutureImprovementsSection({
  improvements,
}: {
  improvements?: ProjectImprovement[] | null;
}) {
  if (!improvements?.length) return null;

  const icons = [CreditCard, Bell, BarChart3, CalendarClock];

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="grid gap-6 md:grid-cols-2">
        {improvements.map((item, index) => {
          const Icon = icons[index % icons.length];

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-[24px] border border-[#6D65FF]/15 bg-white p-6 shadow-[0_16px_40px_rgba(109,101,255,0.08)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7F6FF]">
                <Icon className="h-6 w-6 text-[#6D65FF]" strokeWidth={1.8} />
              </div>

              <h4 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h4>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function ProjectCaseStudy({
  architecture,
  improvements,
}: ProjectCaseStudyProps) {
  if (!architecture && !improvements?.length) return null;

  return (
    <section id="details" className="scroll-mt-24">
      <div className="mx-auto mt-20 mb-12 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[#6D65FF]/30 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-4 text-center sm:mb-12"
      >
        <h3 className="text-2xl font-semibold text-[#6D65FF] sm:text-3xl">
          Why This System Was Built
        </h3>
      </motion.div>

      <WhyBuiltSection />

      {!!architecture && (
        <>
          <div className="mx-auto my-12 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[#6D65FF]/30 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-3 text-center sm:mb-6"
          >
            <h3 className="text-2xl font-semibold text-[#6D65FF] sm:text-3xl">
              System Architecture
            </h3>
          </motion.div>

          <DetailSection architecture={architecture} />
        </>
      )}

      {!!improvements?.length && (
        <>
          <div className="mx-auto my-12 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[#6D65FF]/30 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-3 text-center sm:mb-6"
          >
            <h3 className="text-2xl font-semibold text-[#6D65FF] sm:text-3xl">
              Future Improvements
            </h3>
          </motion.div>

          <FutureImprovementsSection improvements={improvements} />

          <div className="mx-auto my-12 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[#6D65FF]/30 to-transparent" />
        </>
      )}
    </section>
  );
}
