"use client";

import Link from "next/link";
import type { FC, ReactNode } from "react";
// to do : fix layout
const Resume: FC = () => {
  return (
    <section className="w-full flex justify-center py-10 px-6">
      <div className="max-w-2xl w-full space-y-8 text-neutral-900 leading-relaxed">
        {/* Header */}
        <div className="space-y-1">
          <div className="text-sm uppercase font-semibold text-[#6D65FF] leading-tight">
            Full Stack
            <br />
            Web Developer
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Sooah Cho</h1>
        </div>

        {/* Contact */}
        <div className="flex flex-col text-sm space-y-0.5">
          <Link href="https://github.com/sooah1219" className="hover:underline">
            github.com/sooah1219
          </Link>
          <span>778 - 879 - 6281</span>
          <span>sooah1219@gmail.com</span>
        </div>

        {/* Education */}
        <Section title="Education">
          <Row
            left={
              <>
                <div className="font-semibold">
                  British Columbia Institute Technology
                </div>
                <div className="text-sm mt-1">
                  • Diploma of Full Stack Web Development
                </div>
              </>
            }
            right="Sep 2024 – Present"
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

        {/* Projects */}
        <Section title="Projects">
          <Project
            title="Community of Guardians — Social Platform Web"
            period="Jan 2026 – Present"
            role="Full stack web developer"
            link="https://github.com/Cog-IDSP"
            bullets={[
              "React + Typescript + SQL + CSS",
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
              "Typescript + Express.js + MongoDB + CSS(Sass)",
              "Received refined UX/UI Figma files and worked in an agile workflow using Jira.",
              "Modeled users, listings, and categories in MongoDB and implemented upload and browsing flows that enable community-driven item lending.",
            ]}
          />
        </Section>

        {/* Experience */}
        <Section title="Experience">
          <Row
            left="Manager / Tenton Restaurant"
            right="2020 – 2025"
            boldLeft
          />
          <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
            <li>
              Optimized front-of-house workflows and service standards, reducing
              wait times and improving overall customer satisfaction.
            </li>
            <li>
              Developed and deployed a real-time online ordering and reservation
              platform, enabling smoother service coordination and driving
              measurable increases in sales.
            </li>
          </ul>
        </Section>

        {/* Certification */}
        <Section title="Certification">
          <Row left="AWS Certified Developer – Associate" right="2025" />
        </Section>
      </div>
    </section>
  );
};

/* ---------- Reusable sub components ---------- */

interface SectionProps {
  title: string;
  children: ReactNode;
}

const Section: FC<SectionProps> = ({ title, children }) => (
  <div className="space-y-3">
    <h2 className="text-[15px] font-bold uppercase tracking-wide text-[#6D65FF]">
      {title}
    </h2>
    {children}
  </div>
);

interface SubTitleProps {
  children: ReactNode;
}

const SubTitle: FC<SubTitleProps> = ({ children }) => (
  <div className="font-semibold text-sm mt-2">{children}</div>
);

interface RowProps {
  left: ReactNode;
  right?: string;
  boldLeft?: boolean;
}

const Row: FC<RowProps> = ({ left, right, boldLeft }) => (
  <div className="flex justify-between">
    <div className={boldLeft ? "font-semibold" : ""}>{left}</div>
    {right && <div className="text-sm whitespace-nowrap">{right}</div>}
  </div>
);

interface SkillLineProps {
  skills: string;
}

const SkillLine: FC<SkillLineProps> = ({ skills }) => (
  <div className="text-sm">{skills}</div>
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
    <Row left={title} right={period} boldLeft />
    <div className="text-sm">{role}</div>
    <Link
      href={link}
      className="text-sm text-blue-600 hover:underline break-all"
    >
      {link}
    </Link>
    <ul className="list-disc pl-5 text-sm space-y-1 mt-1">
      {bullets.map((b: string, i: number) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  </div>
);

export default Resume;
