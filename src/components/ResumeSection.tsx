"use client";

import Image from "next/image";
import Link from "next/link";
import type { FC, ReactNode } from "react";

import { Card } from "@/components/ui/card";

const ResumeSection: FC = () => {
  return (
    <section className="w-full flex justify-center px-4">
      <div className="max-w-6xl w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Resume
          </h1>

          <a
            href="/sooah-cho-resume.pdf"
            download
            className="
      inline-flex items-center gap-2 rounded-md border border-[#6D65FF]
      px-3 py-1.5 text-xs sm:text-sm font-medium hover:text-[#6D65FF]
      hover:bg-[#6D65FF]/10 whitespace-nowrap bg-[#6D65FF] text-white transition-colors"
          >
            Download PDF
          </a>
        </div>

        <Card className="border border-border/70 bg-card/80 shadow-sm">
          <div className="p-4 sm:p-8 md:p-10 max-w-2xl mx-auto space-y-8 text-neutral-900 leading-relaxed">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-[#6D65FF]">
                  <Image
                    src="/images/logo.png"
                    alt="icon"
                    width={26}
                    height={26}
                    className="mt-0.5"
                  />

                  <div className="font-semibold leading-tight text-xs sm:text-sm md:text-[15px]">
                    Full Stack
                    <br />
                    Web Developer
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  Sooah Cho
                </h2>
              </div>

              <div className="flex flex-col text-right space-y-0.5 text-[11px] sm:text-[13px] md:text-[15px]">
                <div className="uppercase font-semibold text-[#6D65FF] tracking-wide text-xs sm:text-sm md:text-[15px] leading-tight">
                  Contact
                </div>
                <Link
                  href="https://github.com/sooah1219"
                  className="hover:underline"
                >
                  github.com/sooah1219
                </Link>
                <span>sooah1219@gmail.com</span>
              </div>
            </div>

            <Section title="Education">
              <Row
                left={
                  <>
                    <div className="font-semibold">
                      British Columbia Institute Technology
                    </div>
                    <div className="text-[12px] sm:text-[13px] md:text-[15px] leading-relaxed mt-1">
                      • Diploma of Full Stack Web Development
                    </div>
                  </>
                }
                right="Sep 2024 – Apr 2026"
              />
            </Section>

            {/* Skills */}
            <Section title="Skills">
              <SubTitle>Frontend</SubTitle>
              <SkillLine skills="HTML | CSS | Javascript | Typescript | React / React Native | Tailwind | Next.js" />

              <SubTitle>Backend</SubTitle>
              <SkillLine skills="Node.js | Python | PHP | C# | APIs | SQL | PostgreSQL | MongoDB" />

              <SubTitle>Tools &amp; Operations</SubTitle>
              <SkillLine skills="Github | Figma | Jira | Agile | AWS Basics | Vercel | CI/CD | SEO" />
            </Section>

            <Section title="Projects">
              <Project
                title="Community of Guardians — Social Platform Web"
                period="Jan 2026 – Present"
                role="Full stack web developer"
                link="https://github.com/Cog-IDSP"
                bullets={[
                  "React + Typescript + PostgreSQL + CSS",
                  "Worked with a real nonprofit client to define and deliver requested platform features.",
                  "Built quizzes, SDG-focused education modules, community forums, and a gamified mission points system.",
                ]}
              />

              <Project
                title="Forge — Career Exploration App"
                period="Sep 2025 – Dec 2025"
                role="Full stack web developer"
                link="https://github.com/Forge-IDSP"
                bullets={[
                  "React Native + Bun + Hono + PostgreSQL + Clerk + Tailwind",
                  "Built an AI-driven conversational mentor with gamified learning progression.",
                  "Worked with BCIT design students to validate UX decisions, refine flow structures, and align pacing with learner expectations.",
                ]}
              />

              <Project
                title="LendItOut — Marketplace App"
                period="Mar 2025 – May 2025"
                role="Full stack web developer"
                link="https://github.com/IDSP-LendItOut/LendItOut"
                bullets={[
                  "Typescript + Express.js + MongoDB + SCSS",
                  "Received refined UX/UI Figma files and worked in an agile workflow using Jira.",
                  "Modeled users, listings, and categories in MongoDB and implemented upload and browsing flows that enable community-driven item lending.",
                ]}
              />
            </Section>

            <Section title="Experience">
              <Row
                left="Manager / Tenton Restaurant"
                right="2020 – 2025"
                boldLeft
              />
              <ul className="list-disc pl-5 mt-2 text-[12px] sm:text-[14px] md:text-[16px] space-y-1">
                <li>
                  Optimized front-of-house workflows and service standards,
                  reducing wait times and improving overall customer
                  satisfaction.
                </li>
                <li>
                  Developed and deployed a real-time online ordering and
                  reservation platform, enabling smoother service coordination
                  and driving measurable increases in sales.
                </li>
              </ul>
            </Section>

            <Section title="Certification">
              <Row left="AWS Certified Developer – Associate" right="2025" />
            </Section>
          </div>
        </Card>
      </div>
    </section>
  );
};

interface SectionProps {
  title: string;
  children: ReactNode;
}

const Section: FC<SectionProps> = ({ title, children }) => (
  <div className="space-y-3 border-t border-[#6D65FF] pt-4">
    <h3 className="font-bold uppercase tracking-wide text-[#6D65FF] text-xs sm:text-sm md:text-[15px]">
      {title}
    </h3>
    {children}
  </div>
);

interface SubTitleProps {
  children: ReactNode;
}

const SubTitle: FC<SubTitleProps> = ({ children }) => (
  <div className="font-semibold mt-2 text-[13px] sm:text-[13px] md:text-[15px]">
    {children}
  </div>
);

interface RowProps {
  left: ReactNode;
  right?: string;
  boldLeft?: boolean;
}

const Row: FC<RowProps> = ({ left, right, boldLeft }) => (
  <div className="flex justify-between gap-4">
    <div
      className={
        boldLeft
          ? "font-semibold text-[12px] sm:text-[14px] md:text-[16px]"
          : "text-[12px] sm:text-[13px] md:text-[15px]"
      }
    >
      {left}
    </div>

    {right && (
      <div className="whitespace-nowrap text-[11px] sm:text-[13px] md:text-[15px] text-right">
        {right}
      </div>
    )}
  </div>
);

interface SkillLineProps {
  skills: string;
}

const SkillLine: FC<SkillLineProps> = ({ skills }) => (
  <div className="text-[13px] sm:text-[13px] md:text-[15px]">{skills}</div>
);

interface ProjectProps {
  title: string;
  period: string;
  role: string;
  link: string;
  bullets: string[];
}

const Project: FC<ProjectProps> = ({ title, period, role, link, bullets }) => (
  <div className="space-y-1">
    <div className="flex justify-between gap-4">
      <div className="font-semibold text-[12px] sm:text-[14px] md:text-[16px]">
        {title}
      </div>

      <div className="text-right text-[11px] sm:text-[13px] md:text-[15px] whitespace-nowrap">
        <div>{period}</div>
        <div className="text-[11px] sm:text-[13px] md:text-[15px]">{role}</div>
      </div>
    </div>

    <Link
      href={link}
      className="text-[11px] sm:text-[13px] md:text-[15px] text-blue-600 hover:underline break-all"
    >
      {link}
    </Link>

    <ul className="list-disc pl-5 text-[11px] sm:text-[13px] md:text-[15px] space-y-1 mt-1">
      {bullets.map((b: string, i: number) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  </div>
);

export default ResumeSection;
