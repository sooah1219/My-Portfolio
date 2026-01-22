"use client";

import { Card } from "@/components/ui/card";
import { skills } from "@/data/skill";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Level = "learning" | "comfortable" | "confident";

type Skill = {
  name: string;
  level: Level;
};

type SkillsMap = Record<string, Skill[]>;

const skillsTyped = skills as SkillsMap;
type Category = keyof typeof skillsTyped;

const levelStyles: Record<Level, { wrapper: string; label: string }> = {
  learning: {
    wrapper: "border-[#E7E6FF] bg-[#F5F4FF] text-[#4E47CE]",
    label: "Learning",
  },
  comfortable: {
    wrapper: "border-[#C6C4FF] bg-[#E4E3FF] text-[#3C36B8]",
    label: "Comfortable",
  },
  confident: {
    wrapper: "border-[#6D65FF] bg-[#6D65FF] text-white",
    label: "Confident",
  },
};

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 6, scale: 0.96 },
  visible: (order: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      delay: order * 0.07,
    },
  }),
};

type SkillBadgeProps = {
  name: string;
  level: Level;
};

function SkillBadge({ name, level }: SkillBadgeProps) {
  const cfg = levelStyles[level];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs md:text-[11px] font-medium ${cfg.wrapper} hover:shadow-sm hover:-translate-y-[3px]`}
    >
      <span className="text-[11px] md:text-[11px]">{name}</span>
    </span>
  );
}

function SkillList({ list }: { list: Skill[] }) {
  const [randomOrder] = useState(() =>
    list.map((_, idx) => idx).sort(() => Math.random() - 0.5)
  );

  return (
    <motion.ul
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap gap-2 justify-center mt-0 md:mt-3"
    >
      {list.map((s, idx) => {
        const order = randomOrder[idx] ?? idx;
        return (
          <motion.li
            key={s.name}
            variants={badgeVariants}
            custom={order}
            className="list-none"
          >
            <SkillBadge name={s.name} level={s.level} />
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

const HERO_LINES = [
  "<Hello, I'm Sooah! ✋ >",
  "<full stack developer >",
  "<turning concepts into real products. >",
];

export default function HeroWithSkills() {
  const categories = useMemo(() => Object.keys(skillsTyped) as Category[], []);
  const [active, setActive] = useState<Category>(
    categories[0] ?? ("" as Category)
  );
  const list: Skill[] = skillsTyped[active] ?? [];

  const [displayedLines, setDisplayedLines] = useState<string[]>(() =>
    HERO_LINES.map(() => "")
  );
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= HERO_LINES.length) return;

    const fullLine = HERO_LINES[currentLine];

    const interval = setInterval(() => {
      setDisplayedLines((prev) => {
        const copy = [...prev];
        copy[currentLine] = fullLine.slice(0, currentChar + 1);
        return copy;
      });

      if (currentChar < fullLine.length - 1) {
        setCurrentChar((c) => c + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentLine((l) => l + 1);
          setCurrentChar(0);
        }, 400);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [currentLine, currentChar]);

  const typingFinished = currentLine >= HERO_LINES.length;

  return (
    <section className="w-full flex justify-center mt-10 px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        {/* LEFT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="px-4 py-10 flex flex-col items-center gap-6 sm:min-h-[400px]">
            <motion.div
              className="relative w-32 h-32 md:w-36 md:h-36 rounded-full mb-5 overflow-hidden shadow-[0_0_15px_5px_#6D65FF]/30"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/sooah.png"
                fill
                alt="Profile"
                className="object-cover"
              />
            </motion.div>

            <div className="flex flex-col gap-1 text-left w-full max-w-lg">
              {HERO_LINES.map((_, idx) => {
                const isActive = idx === currentLine;
                const hasStarted = displayedLines[idx].length > 0;

                return (
                  <div
                    key={idx}
                    className="flex items-baseline gap-3 whitespace-pre-wrap"
                  >
                    {hasStarted ? (
                      <span className="text-[11px] text-muted-foreground">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    ) : (
                      <span className="text-[11px] w-6" />
                    )}

                    <p className="text-lg md:text-2xl leading-tight">
                      {(() => {
                        const lineText = displayedLines[idx];
                        const name = "Sooah";
                        const i = lineText.indexOf(name);
                        if (i === -1) return lineText;
                        return (
                          <>
                            {lineText.slice(0, i)}
                            <span className="text-[#6D65FF] ">{name}</span>
                            {lineText.slice(i + name.length)}
                          </>
                        );
                      })()}
                      {idx === currentLine && !typingFinished && (
                        <span className="inline-block w-[1ch] animate-pulse">
                          |
                        </span>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* RIGHT CARD - Tech Stack */}
        <Card className="p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Skills
              </p>
              <h2 className="text-xl font-bold">Tech Stack</h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <span className="inline-block h-4 w-4 rounded-full bg-[#E7E6FF]" />{" "}
              Learning
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="inline-block h-4 w-4 rounded-full bg-[#C6C4FF]" />{" "}
              Comfortable
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="inline-block h-4 w-4 rounded-full bg-[#6D65FF]" />{" "}
              Confident
            </span>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-3 py-1.5 text-[11px] capitalize transition
                  ${
                    active === c
                      ? "bg-[#6D65FF] text-white border-[#6D65FF]"
                      : "bg-muted/40 hover:bg-muted"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Skills */}
          <div className="rounded-2xl border border-border/70 bg-card/80 p-3 shadow-sm h-full">
            <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              {active}
            </h3>
            <div className="flex-grow flex items-center justify-center">
              <SkillList key={active} list={list} />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
