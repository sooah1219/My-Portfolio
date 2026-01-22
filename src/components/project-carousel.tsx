"use client";

import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type ProjectCarouselProps = {
  images: string[];
  title: string;
};

export function ProjectCarousel({ images, title }: ProjectCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHoveringRef = useRef(false);

  const AUTOPLAY_DELAY = 3500;

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const startAutoplay = useCallback(() => {
    if (!emblaApi) return;

    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }

    autoplayRef.current = setInterval(() => {
      if (!emblaApi) return;
      if (isHoveringRef.current) return; // pause when hovering
      emblaApi.scrollNext();
    }, AUTOPLAY_DELAY);
  }, [emblaApi]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleSelect);

    startAutoplay();

    return () => {
      stopAutoplay();
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleSelect);
    };
  }, [emblaApi, startAutoplay, stopAutoplay]);

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
  };

  if (!images || images.length === 0) return null;

  return (
    <div
      className="relative w-full group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel viewport */}
      <div className="overflow-hidden rounded-t-xl" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div
              key={src + index}
              className="relative flex-[0_0_100%] h-80 mb-4 sm:h-78 md:h-110"
            >
              <Image
                src={src}
                alt={`${title} screenshot ${index + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollTo(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              selectedIndex === index ? "w-4 bg-[#6D65FF]" : "bg-[#6D65FF]/30"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
