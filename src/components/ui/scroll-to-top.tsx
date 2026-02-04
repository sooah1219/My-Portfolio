"use client";

import BouncyIcon from "@/components/ui/BouncyIcon";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [liftPx, setLiftPx] = useState(0);
  const BASE_BOTTOM = 35; // px
  const SAFE_GAP = 20; // px
  const LIFT_RATIO = 0.25;

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 1400);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const footer = document.getElementById("footer");
    if (!footer) return;

    const updateLift = () => {
      const rect = footer.getBoundingClientRect();
      const viewportH = window.innerHeight;

      const overlap = Math.max(0, viewportH - rect.top);

      if (overlap > 0) {
        const softenedLift = overlap * LIFT_RATIO;
        setLiftPx(softenedLift + SAFE_GAP);
      } else {
        setLiftPx(0);
      }
    };

    updateLift();
    window.addEventListener("scroll", updateLift, { passive: true });
    window.addEventListener("resize", updateLift);

    return () => {
      window.removeEventListener("scroll", updateLift);
      window.removeEventListener("resize", updateLift);
    };
  }, []);

  return (
    <div
      style={{ bottom: BASE_BOTTOM + liftPx }}
      className={`
        hidden md:flex
        fixed left-1/2 -translate-x-1/2 z-50

        transition-all duration-300 ease-out
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }
      `}
    >
      <BouncyIcon delay={0}>
        <a
          href="#top"
          aria-label="Back to top"
          className="
            group relative inline-flex items-center justify-center
            h-9 w-9
            rounded-full
            border-2 border-[#6D65FF]/30
            bg-background/60 backdrop-blur
            transition-all duration-200
            hover:border-[#6D65FF]/60
            hover:shadow-[0_0_8px_2px_rgba(109,101,255,0.35)]
          "
        >
          <ChevronUp
            strokeWidth={2.5}
            className="
              h-5 w-5 text-muted-foreground
              transition-all duration-200
              group-hover:-translate-y-0.5
              group-hover:text-[#6D65FF]
              group-hover:drop-shadow-[0_0_4px_rgba(109,101,255,0.6)]
            "
          />
        </a>
      </BouncyIcon>
    </div>
  );
}
