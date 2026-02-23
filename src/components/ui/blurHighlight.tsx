"use client";

import { motion, useInView } from "framer-motion";
import React, { useMemo, useRef } from "react";

type Props = {
  text: string;
  highlights: string[];

  highlightColor?: string;
  highlightRadiusPx?: number;
  highlightPadXClass?: string;
  highlightPadYClass?: string;

  blurAmountPx?: number;
  inactiveOpacity?: number;
  blurDelay?: number;
  blurDuration?: number;

  highlightDelay?: number;
  highlightDuration?: number;

  animateOnce?: boolean;
  className?: string;
};

type Part =
  | { type: "text"; value: string }
  | { type: "hl"; value: string; index: number };

type CSSVars = React.CSSProperties & {
  "--hl"?: string;
};

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function splitByHighlights(text: string, highlights: string[]): Part[] {
  if (!highlights.length) return [{ type: "text", value: text }];

  const escaped = highlights.map(escapeRegExp);
  const re = new RegExp(`(${escaped.join("|")})`, "g");

  let hlIndex = 0;
  const out: Part[] = [];
  const chunks = text.split(re);

  for (const chunk of chunks) {
    if (chunk === "") continue;
    if (highlights.includes(chunk))
      out.push({ type: "hl", value: chunk, index: hlIndex++ });
    else out.push({ type: "text", value: chunk });
  }
  return out;
}

export default function BlurHighlight({
  text,
  highlights,

  highlightColor = "#E4E3FF",
  highlightRadiusPx = 6,
  highlightPadXClass = "px-1",
  highlightPadYClass = "",

  blurAmountPx = 8,
  inactiveOpacity = 0.3,
  blurDelay = 0,
  blurDuration = 0.8,

  highlightDelay = 0.4,
  highlightDuration = 1,

  animateOnce = true,
  className,
}: Props) {
  const parts = useMemo(
    () => splitByHighlights(text, highlights),
    [text, highlights]
  );

  const ref = useRef<HTMLParagraphElement | null>(null);
  const inView = useInView(ref, {
    once: animateOnce,
    margin: "-10% 0px -10% 0px",
  });

  return (
    <motion.p
      ref={ref}
      className={className}
      initial={{ filter: `blur(${blurAmountPx}px)`, opacity: inactiveOpacity }}
      animate={
        inView
          ? { filter: "blur(0px)", opacity: 1 }
          : { filter: `blur(${blurAmountPx}px)`, opacity: inactiveOpacity }
      }
      transition={{ delay: blurDelay, duration: blurDuration, ease: "easeOut" }}
    >
      {parts.map((p, i) => {
        if (p.type === "text") {
          return <React.Fragment key={`t-${i}`}>{p.value}</React.Fragment>;
        }

        return (
          <span key={`h-${i}`} className="relative inline-block">
            <motion.span
              aria-hidden
              className="absolute inset-x-0 inset-y-[3px] -z-10 origin-left"
              style={
                {
                  "--hl": highlightColor,
                  background: "var(--hl)",
                  borderRadius: `${highlightRadiusPx}px`,
                } as CSSVars
              }
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{
                delay: highlightDelay + p.index * 0.12,
                duration: highlightDuration,
                ease: "easeOut",
              }}
            />
            <span
              className={`${highlightPadXClass} ${highlightPadYClass}`.trim()}
            >
              {p.value}
            </span>
          </span>
        );
      })}
    </motion.p>
  );
}
