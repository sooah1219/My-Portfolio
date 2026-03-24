"use client";

import { motion } from "framer-motion";
import { BarChart3, Bell, CalendarClock, CreditCard } from "lucide-react";

type ProjectImprovement = {
  title: string;
  description: string;
};

export default function FutureImprovementsSection({
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
