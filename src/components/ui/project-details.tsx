"use client";

import BlurHighlight from "@/components/ui/blurHighlight";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useMemo, useRef, useState } from "react";

export type DetailItem = {
  title: string;
  description: string[];
  video?: string;
  keywords?: string[];
};

export type Platform = "Mobile" | "Web";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden>
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
            preload="auto"
            className={
              isMac
                ? "w-full aspect-video object-cover cursor-pointer"
                : "w-full h-full object-cover cursor-pointer"
            }
          >
            <source src={item.video} type="video/mp4" />
          </video>

          <div
            className="
              pointer-events-none absolute inset-0
              bg-black/40 opacity-0
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
    flex items-center justify-center cursor-pointer
    ${isMac ? "h-16 w-16" : "h-10 w-10"}

    rounded-full
    bg-white/70
    backdrop-blur-md
    border border-white/40

    text-black

    ${
      isMac
        ? "shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
        : "shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
    }

    transition-all duration-200
    hover:scale-110
    hover:bg-white
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

function DetailCarousel({
  items,
  device,
}: {
  items: DetailItem[];
  device: "mac" | "phone";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const inView = useInView(ref, { amount: 0.2, once: true });
  const currentItem = useMemo(() => items[currentIndex], [items, currentIndex]);

  const isWeb = device === "mac";

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

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    setIsPlaying(true);
  };

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  if (!items.length) return null;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative"
    >
      <div className="sr-only">
        {items.map(
          (item, i) =>
            item.video && (
              <video key={`preload-${i}`} preload="auto" muted playsInline>
                <source src={item.video} type="video/mp4" />
              </video>
            )
        )}
      </div>

      <div
        className="
          relative overflow-hidden rounded-[28px]
          bg-[#F7F6ff]
          px-5 py-7
          sm:px-7 sm:py-8
          md:px-10 md:py-10
        "
      >
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous"
          className="
            absolute left-3 top-1/2 z-20 flex -translate-y-1/2
            h-10 w-10 items-center justify-center rounded-full
            border-2 border-[#6D65FF]/30 text-[#6D65FF]/60 bg-white shadow-[0_0_5px_3px_#6D65FF]/10 backdrop-blur transition-all duration-200 hover:border-[#6D65FF]/60 cursor-pointer
            sm:left-5 sm:h-12 sm:w-12
          "
        >
          <ChevronLeft className="h-5 w-5 sm:h-7 sm:w-7" />
        </button>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next"
          className="
            absolute right-3 top-1/2 z-20 flex -translate-y-1/2
            h-10 w-10 items-center justify-center rounded-full
            border-2 border-[#6D65FF]/30 text-[#6D65FF]/60 bg-white shadow-[0_0_5px_3px_#6D65FF]/10 backdrop-blur transition-all duration-200 hover:border-[#6D65FF]/60 cursor-pointer
            sm:right-5 sm:h-12 sm:w-12
          "
        >
          <ChevronRight className="h-5 w-5 sm:h-7 sm:w-7" />
        </button>

        {isWeb ? (
          <div className="mx-auto flex w-full max-w-[780px] flex-col items-center gap-8 md:px-8">
            <div className="w-full">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`mac-${currentIndex}`}
                  initial={{ opacity: 0, scale: 0.992 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.008 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="w-full"
                >
                  <div
                    className="
                      group relative w-full
                      rounded-2xl bg-black p-[10px]
                      shadow-[0_18px_40px_rgba(0,0,0,0.08)]
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
                        item={currentItem}
                        videoRef={videoRef}
                        isPlaying={isPlaying}
                        togglePlay={togglePlay}
                        variant="mac"
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="w-full">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`web-content-${currentIndex}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="mx-auto max-w-[620px] px-2 text-left sm:px-14 md:px-0"
                >
                  <p
                    className="
                    text-[46px] font-semibold leading-none tracking-tight
                    text-[#6D65FF]/80
                    text-center md:text-left
                    sm:text-[40px] md:text-[60px]
                    "
                  >
                    {String(currentIndex + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-[24px] font-medium tracking-[-0.02em] text-black text-center md:text-left sm:text-[36px] md:text-[28px]">
                    {currentItem.title}
                  </h3>

                  <ul
                    className="
                    mt-4 inline-block space-y-1
                    text-center md:text-left
                    text-muted-foreground
                    "
                  >
                    {currentItem.description.map((d, i) => (
                      <li
                        key={`${currentItem.title}-desc-${i}`}
                        className="leading-relaxed"
                      >
                        <BlurHighlight
                          text={d}
                          highlights={currentItem.keywords ?? []}
                          className="leading-relaxed"
                          blurAmountPx={6}
                          inactiveOpacity={0.35}
                          highlightDelay={0.2}
                          highlightDuration={0.8}
                        />
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(260px,340px)_1fr] md:gap-4 md:px-8">
            <div className="order-2 md:order-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`phone-${currentIndex}`}
                  initial={{ opacity: 0, scale: 0.992 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.008 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="mx-auto flex w-full justify-center"
                >
                  <div className="w-full max-w-[220px] sm:max-w-[250px] md:max-w-[300px]">
                    <div
                      className="
                        group relative rounded-[2.2rem]
                        bg-black/80 p-[8px]
                        shadow-[0_18px_40px_rgba(0,0,0,0.08)]
                      "
                    >
                      <div className="relative overflow-hidden rounded-[1.8rem] bg-black">
                        <DeviceVideo
                          item={currentItem}
                          videoRef={videoRef}
                          isPlaying={isPlaying}
                          togglePlay={togglePlay}
                          variant="phone"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="order-1 md:order-2">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`content-${currentIndex}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="mx-auto max-w-[620px] px-2 text-left sm:px-14 md:px-0"
                >
                  <p className="text-[46px] font-semibold leading-none tracking-tight text-[#6D65FF]/80 sm:text-[40px] md:text-[60px]">
                    {String(currentIndex + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-2 text-[24px] font-medium tracking-[-0.02em] text-black sm:text-[36px] md:text-[28px]">
                    {currentItem.title}
                  </h3>

                  <ul className="mt-4 inline-block space-y-1 text-left text-muted-foreground">
                    {currentItem.description.map((d, i) => (
                      <li
                        key={`${currentItem.title}-desc-${i}`}
                        className="leading-relaxed"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-3">
          {items.map((_, index) => {
            const isActive = index === currentIndex;

            return (
              <button
                key={`indicator-${index}`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goTo(index)}
                className={`h-[4px] rounded-full transition-all duration-300 cursor-pointer ${
                  isActive ? "w-14 bg-[#6D65FF]/70" : "w-8 bg-[#6D65FF]/30"
                }`}
              />
            );
          })}
        </div>
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
  const p = String(platform).toLowerCase();
  const isWeb = p === "web";

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
        <h2 className="mx-2 text-2xl font-semibold text-[#6D65FF] sm:text-3xl">
          Product Walkthrough
        </h2>
        <p className="mx-auto mt-3 max-w-md text-xs text-muted-foreground sm:text-sm">
          A step-by-step look at how the product works through real
          interactions.
        </p>
      </motion.div>

      <DetailCarousel items={items} device={isWeb ? "mac" : "phone"} />
    </section>
  );
}
