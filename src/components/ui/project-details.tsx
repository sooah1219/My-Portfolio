"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type DetailItem = {
  title: string;
  description: string[];
  image?: string;
  video?: string;
};

function DetailSection({
  item,
  isLeft,
}: {
  item: DetailItem;
  isLeft: boolean;
  index: number;
}) {
  const ref = useRef<HTMLElement | null>(null);

  const inView = useInView(ref, {
    amount: 0.75,
    margin: "0px 0px -20% 0px",
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={
        inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -40 : 40 }
      }
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative grid grid-cols-1 md:grid-cols-2 items-center"
    >
      {/* 🔹 Arrow (desktop only) — show on all sections, flip on the right layout */}
      <Image
        src="/images/arrow.png"
        alt=""
        aria-hidden
        width={100}
        height={100}
        className={`
          pointer-events-none
          absolute
          hidden md:block
          top-1/4 -translate-y-1/2
          opacity-80
          z-20
          ${isLeft ? "left-[400px]" : "right-[400px] scale-x-[-1]"}
        `}
      />

      {/* Media */}
      <div className={isLeft ? "order-1" : "order-1 md:order-2"}>
        <div
          className="
            relative mx-auto w-full
            max-w-[220px] sm:max-w-[260px] md:max-w-[300px]
            rounded-[2rem] bg-black p-[6px]
            shadow-[0_0_10px_2px_rgba(109,101,255,0.18)]
          "
        >
          <div className="relative overflow-hidden rounded-[1.6rem] bg-black">
            {inView && item.video ? (
              <video
                src={item.video}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full aspect-[9/19.5] bg-black" />
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Text */}
      <div className={`${isLeft ? "order-2" : "order-2 md:order-1"} space-y-3`}>
        <h3 className="text-base sm:text-lg font-semibold text-[#6D65FF]">
          {item.title}
        </h3>
        {item.description && (
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            {item.description.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.section>
  );
}

export default function ProjectDetails({ items }: { items: DetailItem[] }) {
  return (
    <div id="details" className="scroll-mt-24">
      {/* Product Walkthrough Title */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-16 text-center"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
          Details
        </p>
        <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-[#6D65FF]">
          Product Walkthrough
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
          A step-by-step look at how the product works through real
          interactions.
        </p>
      </motion.div>

      {/* Sections */}
      <div className="space-y-24">
        {items.map((item, i) => (
          <DetailSection
            key={item.title + i}
            item={item}
            isLeft={i % 2 === 0}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
