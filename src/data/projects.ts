// data/projects.ts
export type Project = {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  techStack: string[];
  summary: string;
  platform: "Web" | "Mobile";
  developedAt: string;
  role: string;
  contributions: string;
  type: string;
  liveUrl: string;
  githubUrl: string;
  images: string[];
};

// export const projects: Project[] = [
//   {
//     id: "1",
//     slug: "forge-career-explorer",
//     title: "Forge – Career Exploration App",
//     thumbnail: "/images/forge.png",
//     techStack: ["React Native", "TypeScript", "PostgreSQL", "Clerk", "Vercel"],
//     summary:
//       "Mobile app that helps high school students explore trades careers using conversational AI, gamified pathways, and real data from SkilledTradesBC.",
//     platform: "Mobile",
//     developedAt: "2025-09-01",
//     role: "Full stack developer",
//     contributions: "contributions",
//     type: "Team project",
//     liveUrl: ".com",
//     githubUrl: ".com",
//     images: ["/images/forge.png", "/images/forge.png", "/images/lenditout.png"],
//   },
//   {
//     id: "2",
//     slug: "lenditout-marketplace",
//     title: "LendItOut – Lending Marketplace App",
//     thumbnail: "/images/lenditout.png",
//     techStack: [
//       "HTML",
//       "TypeScript",
//       "Node.js",
//       "Express",
//       "MongoDB",
//       "Render",
//     ],
//     summary:
//       "Web platform for lending and borrowing items in the community with listing management, categories, and search.",
//     platform: "Mobile",
//     developedAt: "2025-04-01",
//     role: "Full stack developer",
//     contributions: "contributions",
//     type: "Team project",
//     liveUrl: ".com",
//     githubUrl: ".com",
//     images: ["/images/lenditout.png", "/images/forge.png", "/images/forge.png"],
//   },
//   {
//     id: "3",
//     slug: "live-order-platform",
//     title: "Tenton Ramen - Live Order Platform",
//     thumbnail: "/images/ramen2.png",
//     techStack: [
//       "React",
//       "TypeScript",
//       "Next.js",
//       "PostgreSQL",
//       "Clerk",
//       "Vercel",
//     ],
//     summary:
//       "Customer-facing restaurant web app where guests can browse the menu, make reservations, and place live orders. Supports dine-in and take-out with real-time order status, reducing phone calls and improving order accuracy.",
//     platform: "Web",
//     developedAt: "2026-02-01",
//     role: "Full stack developer",
//     contributions: "contributions",
//     type: "Solo",
//     liveUrl: ".com",
//     githubUrl: ".com",
//     images: ["/images/ramen2.png", "/images/cog.png", "/images/ramen2.png"],
//   },
//   {
//     id: "4",
//     slug: "community-of-guardians",
//     title: "Community of Guardians – Social Impact Platform",
//     thumbnail: "/images/cog.png",
//     techStack: [
//       "React",
//       "TypeScript",
//       "Node.js",
//       "Express",
//       "PostgreSQL",
//       "AWS",
//     ],
//     summary:
//       "Social platform built around the UN Sustainable Development Goals, featuring daily quests, community actions, badges, and social engagement features.",
//     platform: "Web",
//     developedAt: "2026-01-01",
//     role: "Frontend developer",
//     contributions: "contributions",
//     type: "Real Client",
//     liveUrl: ".com",
//     githubUrl: ".com",
//     images: ["/images/cog.png", "/images/cog.png", "/images/ramen2.png"],
//   },
// ];
