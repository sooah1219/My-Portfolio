"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const competitors = [
  {
    name: "Career.io",
    x: 28,
    y: 30,
    logo: "/images/forge/careerio.png",
    width: 150,
    height: 52,
    opacity: 0.52,
  },
  {
    name: "TradeUpBC",
    x: 24,
    y: 42,
    logo: "/images/forge/tradeupbc.png",
    width: 170,
    height: 58,
    opacity: 0.52,
  },
  {
    name: "SkilledTradesBC",
    x: 18,
    y: 20,
    logo: "/images/forge/skilledtradesbc.png",
    width: 190,
    height: 46,
    opacity: 0.7,
  },
  {
    name: "STEP",
    x: 34,
    y: 60,
    logo: "/images/forge/step.png",
    width: 120,
    height: 52,
    opacity: 0.6,
  },
  {
    name: "Skills Ontario",
    x: 85,
    y: 72,
    logo: "/images/forge/skillsontario.png",
    width: 200,
    height: 115,
    opacity: 0.45,
  },
  {
    name: "Forge",
    x: 72,
    y: 24,
    logo: "/images/forge/forgelogo.png",
    width: 90,
    height: 84,
  },
];

export default function CompetitiveAnalysis() {
  return (
    <div className="mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-[24px] bg-[#F7F6ff] px-4 py-8 sm:px-8 sm:py-12"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1.7fr]">
          {/* LEFT */}
          <div className="space-y-5 text-[15px] leading-7 text-gray-700 sm:text-[16px]">
            <p>
              Existing trade and career platforms provide useful information,
              but many rely on static resources, fragmented navigation, and
              limited interactive learning experiences.
            </p>

            <p>
              Most competitors focus on listings, institutional data, or general
              information delivery. However, these approaches often lack guided
              exploration and real-time engagement for early-stage learners.
            </p>

            <p>
              <span className="font-semibold text-gray-900">
                Forge differentiates itself
              </span>{" "}
              by introducing guided career discovery, AI-supported simulation,
              and gamified progression that transforms passive browsing into an
              active learning journey.
            </p>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="relative h-[520px] rounded-[24px] bg-white p-6 shadow-[0_14px_35px_rgba(109,101,255,0.08)]">
              <div className="absolute left-1/2 top-10 bottom-10 w-px -translate-x-1/2 bg-[#6D65FF]/60">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-b-[7px] border-b-[#6D65FF]/60" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-t-[7px] border-t-[#6D65FF]/60" />
              </div>

              <div className="absolute top-1/2 left-20 right-20 h-px -translate-y-1/2 bg-[#6D65FF]/60">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[5px] border-y-transparent border-r-[7px] border-r-[#6D65FF]/60" />
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[5px] border-y-transparent border-l-[7px] border-l-[#6D65FF]/60" />
              </div>

              {/* labels */}
              <div className="absolute left-1/2 top-2 -translate-x-1/2 text-xs text-gray-600">
                Actionable Guidance
              </div>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-600">
                Static Information
              </div>

              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-600">
                Manual
              </div>

              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-600">
                AI-powered
              </div>

              {/* competitors */}
              {competitors.map((item) => (
                <div
                  key={item.name}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                  }}
                >
                  <div
                    className="relative transition-opacity duration-300 hover:opacity-80"
                    style={{
                      width: item.width,
                      height: item.height,
                      opacity: item.opacity,
                    }}
                  >
                    <Image
                      src={item.logo!}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[13px] leading-relaxed text-gray-500">
              Platforms were positioned based on how effectively they support
              guided learning and actionable career exploration.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
