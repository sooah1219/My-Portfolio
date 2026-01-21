"use client";

import { Card, CardContent } from "@/components/ui/card";
import { skills } from "@/data/skill";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

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

export default function HeroWithSkills() {
  const categories = useMemo(() => Object.keys(skillsTyped) as Category[], []);

  const [active, setActive] = useState<Category>(
    categories[0] ?? ("" as Category)
  );

  const list: Skill[] = skillsTyped[active] ?? [];

  return (
    <section className="w-full flex justify-center mt-10 px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        {/* LEFT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="px-8 py-13 flex flex-col items-center gap-6">
            {/* <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              ABOUT ME
            </p> */}
            <div className="flex items-center justify-center gap-6 flex-wrap text-center">
              <motion.div
                className="relative w-35 h-35 md:w-30 md:h-30 rounded-full overflow-hidden shadow-[0_0_15px_5px_#6D65FF]/30"
                animate={{ y: [0, -9, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* <div className="relative w-35 h-35 md:w-30 md:h-30 rounded-full overflow-hidden shadow-sm"> */}
                <Image
                  src="/images/sooah.png"
                  fill
                  alt="Profile"
                  className="object-cover"
                />
              </motion.div>

              <div className="flex flex-col items-center">
                <h1 className="text-4xl md:text-4xl font-bold">Sooah Cho</h1>
                <h3 className="text-xl md:text-xl mt-1 font-semibold text-[#6D65FF]">
                  Full Stack Developer
                </h3>
              </div>
            </div>

            <CardContent className="max-w-3xl text-center space-y-2 mt-2">
              <p className="text-base md:text-md text-gray-600">
                Experienced in shipping full-stack applications from development
                to production. Comfortable contributing across frontend,
                backend, and cloud deployment with awareness of UI/UX, API
                design, data modeling, and operational reliability. Familiar
                with the full development lifecycle, including planning,
                implementation, deployment, and ongoing improvement.
              </p>
            </CardContent>
          </Card>
        </motion.div>
        {/* RIGHT CARD - Tech Stack */}

        <Card className="p-5 flex flex-col gap-4">
          {/* 헤더 */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Skills
              </p>
              <h2 className="text-xl font-bold">Tech Stack</h2>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <span className="inline-block h-4 w-4 rounded-full bg-[#E7E6FF]" />{" "}
              Learning
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="inline-block h-4 w-4  rounded-full bg-[#C6C4FF]" />{" "}
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
            <ul className="flex flex-wrap gap-2">
              {list.map((s) => (
                <li key={s.name}>
                  <SkillBadge name={s.name} level={s.level} />
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </section>
  );
}
