"use client";

import BlurHighlight from "@/components/ui/blurHighlight";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import React, { useRef, useState } from "react";

export type DetailItem = {
  title: string;
  description: string[];
  video?: string;
  keywords?: string[];
};

export type Platform = "Mobile" | "Web";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  );
}

function DeviceVideo({
  item,
  videoRef,
  isPlaying,
  togglePlay,
  variant,
}: {
  item: DetailItem;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
  togglePlay: () => void;
  variant: "mac" | "phone";
}) {
  const isMac = variant === "mac";

  return (
    <>
      {item.video ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={
              isMac
                ? "w-full aspect-video object-cover"
                : "w-full h-full object-cover"
            }
          >
            <source src={item.video} type="video/mp4" />
          </video>

          <div
            className="
          pointer-events-none absolute inset-0
          bg-black/40
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-200
        "
          />

          <button
            type="button"
            onClick={togglePlay}
            className="
              absolute inset-0 z-10
              flex items-center justify-center
              opacity-0 group-hover:opacity-100
              transition-opacity duration-200
            "
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            <div
              className={`
                flex items-center justify-center
                ${isMac ? "w-12 h-12" : "w-10 h-10"}
                rounded-full bg-white
                text-[#6D65FF]
                border border-[#6D65FF]/40
                ${
                  isMac
                    ? "shadow-[0_0_30px_rgba(109,101,255,0.45)]"
                    : "shadow-[0_0_24px_rgba(109,101,255,0.45),0_0_80px_rgba(109,101,255,0.35)]"
                }
                transition-all duration-200
                hover:scale-110
              `}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </div>
          </button>
        </>
      ) : (
        <div
          className={
            isMac
              ? "w-full aspect-video bg-black"
              : "w-full aspect-[9/19.5] bg-black"
          }
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent" />
    </>
  );
}

function DetailSection({
  item,
  isLeft,
  platform,
}: {
  item: DetailItem;
  isLeft: boolean;
  platform: Platform;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const inView = useInView(ref, { amount: 0.35, once: true });
  const offsetX = isLeft ? -40 : 40;

  const p = String(platform).toLowerCase();
  const isWeb = p === "web";

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

  if (isWeb) {
    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative"
      >
        <div className="mx-auto flex w-full max-w-[980px] flex-col items-center gap-6">
          <div
            className="
              group relative w-full
              rounded-2xl bg-black p-[10px]
              transition-all duration-300
              shadow-[0_0_18px_rgba(109,101,255,0.22)]
              group-hover:shadow-[0_0_28px_rgba(109,101,255,0.65),0_0_140px_rgba(109,101,255,0.40)]
            "
          >
            <div className="flex items-center gap-2 rounded-t-xl bg-neutral-900 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <div className="ml-3 h-2 w-[180px] rounded-full bg-white/10" />
            </div>

            <div className="relative overflow-hidden rounded-b-xl bg-black">
              <DeviceVideo
                item={item}
                videoRef={videoRef}
                isPlaying={isPlaying}
                togglePlay={togglePlay}
                variant="mac"
              />
            </div>
          </div>

          <div className="w-full max-w-[820px] text-center space-y-3">
            <h3 className="text-xl font-bold mt-5 leading-tight tracking-wide text-[#6D65FF] sm:text-[26px]">
              {item.title}
            </h3>

            {/* <ul className="mx-auto inline-block text-left list-disc space-y-1 pl-5 text-muted-foreground">
              {item.description.map((d, i) => (
                <li key={`${item.title}-desc-${i}`}>{d}</li>
              ))}
            </ul> */}
            <ul className="mx-auto inline-block text-left list-disc space-y-1 pl-5 text-muted-foreground">
              {item.description.map((d, i) => (
                <li key={`${item.title}-desc-${i}`}>
                  <BlurHighlight
                    text={d}
                    highlights={item.keywords ?? []}
                    className="leading-relaxed"
                    blurAmountPx={6}
                    inactiveOpacity={0.35}
                    highlightDelay={0.2}
                    highlightDuration={0.8}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, x: offsetX }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: offsetX }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-2"
    >
      <Image
        src="/images/arrow.png"
        alt=""
        aria-hidden
        width={100}
        height={100}
        className={`
          pointer-events-none absolute z-20 hidden md:block
          top-1/4 -translate-y-1/2 opacity-80
          ${isLeft ? "left-[380px]" : "right-[380px] scale-x-[-1]"}
        `}
      />

      <div className={isLeft ? "order-1" : "order-1 md:order-2"}>
        <div
          className="
            group relative mx-auto w-full
            max-w-[220px] sm:max-w-[260px] md:max-w-[300px]
            rounded-[2rem] bg-black p-[6px]
            transition-all duration-300
            shadow-[0_0_18px_rgba(109,101,255,0.22)]
            group-hover:shadow-[0_0_28px_rgba(109,101,255,0.65),0_0_120px_rgba(109,101,255,0.40),0_0_220px_rgba(109,101,255,0.22)]
          "
        >
          <div className="relative overflow-hidden rounded-[1.6rem] bg-black">
            <DeviceVideo
              item={item}
              videoRef={videoRef}
              isPlaying={isPlaying}
              togglePlay={togglePlay}
              variant="phone"
            />
          </div>
        </div>
      </div>

      <div className={`${isLeft ? "order-2" : "order-2 md:order-1"} space-y-3`}>
        <p className="text-[18px] font-bold leading-tight tracking-wide text-[#6D65FF]">
          {item.title}
        </p>

        {/* <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          {item.description.map((d, i) => (
            <li key={`${item.title}-desc-${i}`}>{d}</li>
          ))}
        </ul> */}
        <ul className="mx-auto inline-block text-left list-disc space-y-1 pl-5 text-muted-foreground">
          {item.description.map((d, i) => (
            <li key={`${item.title}-desc-${i}`}>
              <BlurHighlight
                text={d}
                highlights={item.keywords ?? []}
                className="leading-relaxed"
                blurAmountPx={6}
                inactiveOpacity={0.35}
                highlightDelay={0.2}
                highlightDuration={0.8}
              />
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}

export default function ProjectDetailsAuto({
  items,
  platform,
}: {
  items: DetailItem[];
  platform: Platform;
}) {
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
        <h2 className="mt-2 text-2xl font-semibold text-[#6D65FF] sm:text-3xl">
          Product Walkthrough
        </h2>
        <p className="mx-auto mt-3 max-w-md text-xs text-muted-foreground sm:text-sm">
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
            platform={platform}
          />
        ))}
      </div>
    </section>
  );
}
