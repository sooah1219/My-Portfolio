"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

type DetailItem = {
  title: string;
  description: string[];
  video?: string;
};

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8  fill-current" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6  fill-current" aria-hidden>
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  );
}

function DetailSection({
  item,
  isLeft,
}: {
  item: DetailItem;
  isLeft: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const inView = useInView(ref, {
    amount: 0.35,
    once: true,
  });

  const offsetX = isLeft ? -40 : 40;

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, x: offsetX }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: offsetX }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-10"
    >
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
          ${isLeft ? "left-[380px]" : "right-[380px] scale-x-[-1]"}
        `}
      />

      <div className={isLeft ? "order-1" : "order-1 md:order-2"}>
        <div
          className="
            group
            relative mx-auto w-full
            max-w-[220px] sm:max-w-[260px] md:max-w-[300px]
            rounded-[2rem]
            bg-black
            p-[6px]
            transition-all duration-300
            shadow-[0_0_18px_rgba(109,101,255,0.22)]
            group-hover:shadow-[0_0_28px_rgba(109,101,255,0.65),0_0_120px_rgba(109,101,255,0.40),0_0_220px_rgba(109,101,255,0.22)]
          "
        >
          <div className="relative overflow-hidden rounded-[1.6rem] bg-black">
            {item.video ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  <source src={item.video} type="video/mp4" />
                </video>

                {/* ▶️ / ⏸ SVG Button */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="
                    absolute inset-0 z-10
                    flex items-center justify-center
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-200
                  "
                >
                  <div
                    className="
                      flex items-center justify-center
                      w-10 h-10
                      rounded-full
                      bg-white
                      backdrop-blur
                      text-[#6D65FF]
                      border border-[#6D65FF]/40
                      shadow-[0_0_24px_rgba(109,101,255,0.45),0_0_80px_rgba(109,101,255,0.35)]
                      transition-all duration-200
                      hover:scale-110
                      hover:shadow-[0_0_36px_rgba(109,101,255,0.85),0_0_160px_rgba(109,101,255,0.55)]
                    "
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </div>
                </button>
              </>
            ) : (
              <div className="w-full aspect-[9/19.5] bg-black" />
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      <div className={`${isLeft ? "order-2" : "order-2 md:order-1"} space-y-3`}>
        <h3 className="font-handwriting text-xl sm:text-[25px] tracking-wide leading-tight text-[#6D65FF]">
          {item.title}
        </h3>

        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          {item.description.map((d, i) => (
            <li key={`${item.title}-desc-${i}`}>{d}</li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}

export default function ProjectDetails({ items }: { items: DetailItem[] }) {
  return (
    <section id="details" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-20 text-center"
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
      <div className="space-y-24">
        {items.map((item, i) => (
          <DetailSection
            key={`${item.title}-${i}`}
            item={item}
            isLeft={i % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
}
