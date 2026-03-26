"use client";

import BlurHighlight from "@/components/ui/blurHighlight"; // adjust path if needed
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Platform = "Web" | "Mobile" | string;

type DetailItem = {
  title: string;
  description: string[];
  video?: string;
  keywords?: string[];
};

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden>
      <path d="M7 5h3v14H7zm7 0h3v14h-3z" />
    </svg>
  );
}

function DeviceVideoStack({
  items,
  currentIndex,
  isPlaying,
  togglePlay,
  variant,
  setVideoRef,
}: {
  items: DetailItem[];
  currentIndex: number;
  isPlaying: boolean;
  togglePlay: () => void;
  variant: "mac" | "phone";
  setVideoRef: (index: number, node: HTMLVideoElement | null) => void;
}) {
  const isMac = variant === "mac";

  return (
    <>
      {items.some((item) => item.video) ? (
        <>
          <div className="absolute inset-0">
            {items.map((item, index) => {
              const isActive = index === currentIndex;

              if (!item.video) {
                return (
                  <div
                    key={`video-fallback-${index}`}
                    className={`
                      absolute inset-0 bg-black transition-opacity duration-300
                      ${
                        isActive
                          ? "opacity-100"
                          : "pointer-events-none opacity-0"
                      }
                    `}
                    aria-hidden={!isActive}
                  />
                );
              }

              return (
                <video
                  key={`video-${index}-${item.video}`}
                  ref={(node) => setVideoRef(index, node)}
                  src={item.video}
                  muted
                  loop
                  playsInline
                  preload={index === currentIndex ? "auto" : "metadata"}
                  className={`
                    absolute inset-0
                    ${
                      isMac
                        ? "h-full w-full object-cover"
                        : "h-full w-full object-cover"
                    }
                    transition-opacity duration-300
                    ${
                      isActive ? "opacity-100" : "pointer-events-none opacity-0"
                    }
                  `}
                  onClick={togglePlay}
                  aria-hidden={!isActive}
                />
              );
            })}
          </div>

          <div
            className="
              pointer-events-none absolute inset-0
              bg-black/20 opacity-0
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
                hover:scale-110 hover:bg-white
              `}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </div>
          </button>
        </>
      ) : (
        <div
          className={
            isMac ? "absolute inset-0 bg-black" : "absolute inset-0 bg-black"
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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const inView = useInView(ref, { amount: 0.2, once: true });
  const currentItem = useMemo(() => items[currentIndex], [items, currentIndex]);

  const isWeb = device === "mac";

  const setVideoRef = useCallback(
    (index: number, node: HTMLVideoElement | null) => {
      videoRefs.current[index] = node;
    },
    []
  );

  const getActiveVideo = useCallback(() => {
    return videoRefs.current[currentIndex] ?? null;
  }, [currentIndex]);

  const syncVideos = useCallback(
    (nextPlaying: boolean) => {
      videoRefs.current.forEach((video, index) => {
        if (!video) return;

        if (index === currentIndex) {
          if (nextPlaying) {
            const p = video.play();
            if (p) p.catch(() => {});
          } else {
            video.pause();
          }
        } else {
          video.pause();
        }
      });
    },
    [currentIndex]
  );

  const togglePlay = useCallback(() => {
    const activeVideo = getActiveVideo();
    if (!activeVideo) return;

    if (activeVideo.paused) {
      const p = activeVideo.play();
      if (p) p.catch(() => {});
      setIsPlaying(true);
    } else {
      activeVideo.pause();
      setIsPlaying(false);
    }
  }, [getActiveVideo]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    setIsPlaying(true);
  }, [items.length]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    setIsPlaying(true);
  }, [items.length]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    syncVideos(isPlaying);
  }, [currentIndex, isPlaying, syncVideos]);

  useEffect(() => {
    const nextIndex = (currentIndex + 1) % items.length;
    const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;

    [currentIndex, nextIndex, prevIndex].forEach((index) => {
      const video = videoRefs.current[index];
      if (!video) return;

      video.preload = "auto";
    });
  }, [currentIndex, items.length]);

  if (!items.length) return null;
  const hasMultiple = items.length > 1;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative"
    >
      <div className="relative rounded-[28px] border border-[#6D65FF]/10 bg-white px-4 py-6 shadow-[0_18px_40px_rgba(109,101,255,0.08)] sm:px-6 md:px-10 md:py-10">
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous"
              className="
        absolute left-3 top-1/2 z-20 flex -translate-y-1/2
        h-10 w-10 items-center justify-center rounded-full
        border-2 border-[#6D65FF]/30 bg-white text-[#6D65FF]/60
        shadow-[0_0_5px_3px_#6D65FF]/10 backdrop-blur transition-all
        duration-200 hover:border-[#6D65FF]/60 cursor-pointer
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
        border-2 border-[#6D65FF]/30 bg-white text-[#6D65FF]/60
        shadow-[0_0_5px_3px_#6D65FF]/10 backdrop-blur transition-all
        duration-200 hover:border-[#6D65FF]/60 cursor-pointer
        sm:right-5 sm:h-12 sm:w-12
      "
            >
              <ChevronRight className="h-5 w-5 sm:h-7 sm:w-7" />
            </button>
          </>
        )}

        {isWeb ? (
          <div className="mx-auto flex w-full max-w-[780px] flex-col items-center gap-8 md:px-8">
            <div className="w-full">
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
                  <div className="relative w-full aspect-video">
                    <DeviceVideoStack
                      items={items}
                      currentIndex={currentIndex}
                      isPlaying={isPlaying}
                      togglePlay={togglePlay}
                      variant="mac"
                      setVideoRef={setVideoRef}
                    />
                  </div>
                </div>
              </div>
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

                  <h3 className="mt-2 text-center text-[24px] font-medium tracking-[-0.02em] text-black sm:text-[36px] md:text-left md:text-[28px]">
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
              <div className="mx-auto flex w-full justify-center">
                <div className="w-full max-w-[220px] sm:max-w-[250px] md:max-w-[300px]">
                  <div
                    className="
                      group relative rounded-[2.2rem]
                      bg-black/80 p-[8px]
                      shadow-[0_18px_40px_rgba(0,0,0,0.08)]
                    "
                  >
                    <div className="relative overflow-hidden rounded-[1.8rem] bg-black">
                      <div className="relative w-full aspect-[9/19.5]">
                        <DeviceVideoStack
                          items={items}
                          currentIndex={currentIndex}
                          isPlaying={isPlaying}
                          togglePlay={togglePlay}
                          variant="phone"
                          setVideoRef={setVideoRef}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                className={`h-[4px] cursor-pointer rounded-full transition-all duration-300 ${
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

export default function ProjectMedia({
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
      <DetailCarousel items={items} device={isWeb ? "mac" : "phone"} />
    </section>
  );
}
