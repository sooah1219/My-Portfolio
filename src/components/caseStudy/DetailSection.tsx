"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Database,
  LayoutDashboard,
  Monitor,
  Smartphone,
} from "lucide-react";
import Image from "next/image";

type ProjectArchitecture = {
  frontend: string[];
  api: string[];
  database: string[];
  platform: string[];
};

export default function DetailSection({
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
            transition={{ duration: 0.45 }}
            className="relative h-fit rounded-[28px] border border-[#6D65FF]/12 shadow-[0_16px_40px_rgba(109,101,255,0.08)]"
          >
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold text-[#6D65FF]">
                API Layer
              </h3>
            </div>

            <div className="px-6 pb-7">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-6 flex justify-center rounded-xl"
              >
                <div className="flex h-[130px] w-[190px] items-center justify-center">
                  <Image
                    src="/images/api.png"
                    alt="API preview"
                    width={130}
                    height={190}
                    className="h-[130px] w-[150px] object-contain"
                  />
                </div>
              </motion.div>

              <ul className="space-y-4 text-[15px] text-slate-700">
                {architecture.api?.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#6D65FF]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="absolute -right-32 top-1/3 hidden -translate-y-1/2 lg:flex">
              <div className="flex items-center rounded-lg bg-[#B987FC] px-4 py-2 text-sm font-medium text-white shadow-lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                API Req &amp; Res
                <ArrowRight className="ml-2 h-4 w-4" />
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
              transition={{ duration: 0.45 }}
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
              transition={{ duration: 0.45 }}
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
