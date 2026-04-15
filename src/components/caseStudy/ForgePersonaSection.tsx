"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const personas = [
  {
    type: "Primary Persona",
    name: "Wilson Danderson",
    age: "18 years old",
    role: "High School Student",
    location: "Vancouver, BC",
    image: "/images/forge/wilson.png",
    summary:
      "Wilson is a Grade 12 student preparing for graduation and trying to decide what career path to pursue. He feels overwhelmed by too many options and wants structured, beginner-friendly guidance that helps him explore careers with confidence.",
    goals: [
      "Explore realistic career paths before graduation",
      "Understand the skills required for each path",
      "Find clear next steps for education and learning",
      "Make more confident decisions about his future",
    ],
    painPoints: [
      "Too many career options with unclear differences",
      "Online information feels scattered and inconsistent",
      "Does not know which step to take first",
      "Has limited exposure to real career journeys",
    ],
    motivations: [
      "Wants to avoid choosing the wrong path",
      "Wants guidance that feels simple and practical",
      "Wants to discover careers that match his strengths",
    ],
    needs: [
      "Clear step-by-step guidance",
      "Accessible career exploration content",
      "Simple explanations without jargon",
      "Visual learning paths and examples",
    ],
    quote:
      "I want clear guidance so I can make the right decision about my future.",
  },
  {
    type: "Secondary Persona",
    name: "Jamilla Sanderson",
    age: "21 years old",
    role: "Recent Graduate / Part-Time Barista",
    location: "Burnaby, BC",
    image: "/images/forge/jamilla.png",
    summary:
      "Jamilla recently completed her studies and is now looking for direction toward a stable career. She wants practical guidance, skill-building recommendations, and a clearer understanding of how to move from uncertainty into employment.",
    goals: [
      "Identify realistic career opportunities",
      "Build relevant skills quickly",
      "Improve job readiness and confidence",
      "Follow a structured path toward employment",
    ],
    painPoints: [
      "Feels unsure about the next step after graduation",
      "Finds many career resources too broad or generic",
      "Feels overwhelmed by job market expectations",
      "Needs more practical guidance, not just inspiration",
    ],
    motivations: [
      "Wants to secure stable employment",
      "Wants to feel more confident entering the workforce",
      "Wants practical tools that lead to action",
    ],
    needs: [
      "Practical career roadmaps",
      "Skill recommendations based on goals",
      "Real-world examples and guidance",
      "Actionable next steps she can follow immediately",
    ],
    quote:
      "I need step-by-step direction that helps me move toward a stable career.",
  },
];

function PersonaCard({
  persona,
  delay,
}: {
  persona: (typeof personas)[number];
  delay: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay }}
      className="overflow-hidden rounded-[28px] border border-[#6D65FF]/15 bg-white shadow-[0_18px_50px_rgba(109,101,255,0.08)]"
    >
      <div className="bg-gradient-to-r from-[#6D65FF] to-[#B6A8FF] px-6 py-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
          {persona.type}
        </p>
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="shrink-0">
            <div className="overflow-hidden rounded-[22px] border border-[#6D65FF]/10">
              <Image
                src={persona.image}
                alt={persona.name}
                width={180}
                height={180}
                className="h-[160px] w-[160px] object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-3xl font-bold tracking-tight text-[#20223A]">
              {persona.name}
            </h3>

            <div className="mt-3 flex flex-wrap gap-2 text-sm text-[#5B6078]">
              <span className="rounded-full bg-[#F3F1FF] px-3 py-1">
                {persona.age}
              </span>
              <span className="rounded-full bg-[#F3F1FF] px-3 py-1">
                {persona.role}
              </span>
              <span className="rounded-full bg-[#F3F1FF] px-3 py-1">
                {persona.location}
              </span>
            </div>

            <p className="mt-5 text-base leading-7 text-[#4D5268]">
              {persona.summary}
            </p>

            <blockquote className="mt-5 rounded-2xl border border-[#6D65FF]/10 bg-[#FAF9FF] px-5 py-4 text-[15px] italic leading-7 text-[#5A4FCF]">
              “{persona.quote}”
            </blockquote>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <InfoBlock title="Goals" items={persona.goals} />
          <InfoBlock title="Pain Points" items={persona.painPoints} />
          <InfoBlock title="Motivations" items={persona.motivations} />
          <InfoBlock title="Needs" items={persona.needs} />
        </div>
      </div>
    </motion.article>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[22px] border border-[#6D65FF]/10 bg-[#FCFCFF] p-5">
      <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6D65FF]">
        {title}
      </h4>

      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[#4D5268]">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#8C7CFF]" />
            <span className="text-[15px] leading-7">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ForgePersonaSection() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:py-6">
      <div className="space-y-8">
        {personas.map((persona, index) => (
          <PersonaCard
            key={persona.name}
            persona={persona}
            delay={0.08 + index * 0.08}
          />
        ))}
      </div>
    </div>
  );
}
