"use client";
import { ProblemMetric } from "@/db/schema";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CompetitiveAnalysis from "./CompetitiveAnalysis";
import DetailSection from "./DetailSection";
import FutureImprovementsSection from "./FutureImprovementsSection";
import SectionHeader from "./SectionHeader";
import WhyBuiltSection from "./WhyBuiltSection";

type ProjectArchitecture = {
  frontend: string[];
  api: string[];
  database: string[];
  platform: string[];
};

type ProjectImprovement = {
  title: string;
  description: string;
};

type ProjectCaseStudyProps = {
  title?: string;
  architecture?: ProjectArchitecture | null;
  improvements?: ProjectImprovement[] | null;
  problem?: string[] | null;
  problem_intro?: string | null;
  problem_metrics?: ProblemMetric[] | null;
};

type ImageSectionProps = {
  label: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  padded?: boolean;
  zoomable?: boolean;
  onOpen?: () => void;
};

const dividerClassName =
  "mx-auto my-20 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[#6D65FF]/30 to-transparent";

function SectionDivider() {
  return <div className={dividerClassName} />;
}

function CardMotion({
  children,
  className = "",
  delay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ImageSection({
  label,
  title,
  description,
  imageSrc,
  imageAlt,
  padded = false,
  zoomable = false,
  onOpen,
}: ImageSectionProps) {
  return (
    <>
      <SectionDivider />

      <SectionHeader label={label} title={title} description={description} />

      <CardMotion className="group relative overflow-hidden rounded-[24px] border border-[#6D65FF]/15 bg-white shadow-[0_16px_40px_rgba(109,101,255,0.08)]">
        {zoomable ? (
          <button
            type="button"
            onClick={onOpen}
            className="relative block w-full cursor-zoom-in"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1200}
              height={800}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition group-hover:opacity-100">
              <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-800 shadow-md">
                <Search className="h-4 w-4" />
                Click the image to expand
              </div>
            </div>
          </button>
        ) : (
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1200}
            height={800}
            className={`h-full w-full object-cover ${padded ? "p-7" : ""}`}
          />
        )}
      </CardMotion>
    </>
  );
}

export default function ProjectCaseStudy({
  title,
  architecture,
  improvements,
  problem,
  problem_intro,
  problem_metrics,
}: ProjectCaseStudyProps) {
  const [openUserFlow, setOpenUserFlow] = useState(false);

  const hasWhyBuilt =
    !!problem_intro || !!problem?.length || !!problem_metrics?.length;
  const hasArchitecture = !!architecture;
  const isForge = title === "Forge";
  const hasImprovements = !!improvements?.length;

  if (!hasWhyBuilt && !hasArchitecture && !isForge && !hasImprovements) {
    return null;
  }

  return (
    <>
      <section id="details" className="scroll-mt-24">
        {hasWhyBuilt && (
          <>
            <SectionDivider />

            <SectionHeader
              label="Background"
              title="Why This System Was Built"
              description="The motivation behind creating this system and the key problems it was designed to solve for real users."
            />

            <WhyBuiltSection
              problem={problem}
              problem_intro={problem_intro}
              problem_metrics={problem_metrics}
            />
          </>
        )}

        {hasArchitecture && (
          <>
            <SectionDivider />

            <SectionHeader
              label="Technical Overview"
              title="System Architecture"
              description="A structured view of how the frontend, backend, and database components connect to deliver a seamless product experience."
            />

            <DetailSection architecture={architecture} />
          </>
        )}

        {isForge && (
          <div className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
            <SectionDivider />

            <SectionHeader
              label="Research"
              title="Competitive Analysis"
              description="A comparison of existing solutions to identify gaps, opportunities, and areas where this product could deliver stronger value."
            />

            <CardMotion className="group relative overflow-hidden rounded-[24px] border border-[#6D65FF]/15 bg-white shadow-[0_16px_40px_rgba(109,101,255,0.08)]">
              <CompetitiveAnalysis />
            </CardMotion>

            <ImageSection
              label="Visual Foundation"
              title="Design System"
              description="The visual language, logo, typography and colors that ensure consistency across the entire product."
              imageSrc="/images/styleGuide.png"
              imageAlt="Forge Style"
              padded
            />

            <ImageSection
              label="Target Users"
              title="User Persona"
              description="A detailed representation of the primary users, their needs, motivations, and challenges that guided product decisions."
              imageSrc="/images/forge/user.png"
              imageAlt="Forge User"
            />

            <ImageSection
              label="Interaction Journey"
              title="User Flow"
              description="A step-by-step visualization of how users navigate through the product from entry to completing key actions."
              imageSrc="/images/userFlow.png"
              imageAlt="Forge UserFlow"
              zoomable
              onOpen={() => setOpenUserFlow(true)}
            />

            <ImageSection
              label="Final Interface"
              title="High-Fidelity Design"
              description="Polished interface designs that demonstrate the final visual appearance and interactive details of the product."
              imageSrc="/images/forge/HighFi.png"
              imageAlt="Forge Highfi"
            />
          </div>
        )}

        {hasImprovements && (
          <>
            <SectionDivider />

            <SectionHeader
              label="Next Steps"
              title="Future Improvements"
              description="Planned enhancements and ideas that could further improve usability, performance, and overall user experience."
            />

            <FutureImprovementsSection improvements={improvements} />

            <SectionDivider />
          </>
        )}
      </section>

      {openUserFlow && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpenUserFlow(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-6xl overflow-auto rounded-2xl bg-white p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenUserFlow(false)}
              className="absolute right-3 top-3 z-10 cursor-pointer rounded-full bg-black/70 px-3 py-1 text-sm text-white"
            >
              Close
            </button>

            <Image
              src="/images/userFlow.png"
              alt="Forge UserFlow Large"
              width={2200}
              height={1600}
              className="h-auto w-full rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
